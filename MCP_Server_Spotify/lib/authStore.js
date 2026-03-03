import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomBytes } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(
  process.env.AUTH_DATA_PATH || path.join(__dirname, "..", "data")
);
const AUTH_FILE = path.join(DATA_DIR, "auth-data.json");

const RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

function ensureDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
}

function load() {
  ensureDir();
  if (!existsSync(AUTH_FILE)) return { users: [], resetTokens: {} };
  try {
    const raw = readFileSync(AUTH_FILE, "utf8");
    const data = JSON.parse(raw);
    return {
      users: Array.isArray(data.users) ? data.users : [],
      resetTokens:
        data.resetTokens && typeof data.resetTokens === "object"
          ? data.resetTokens
          : {},
    };
  } catch {
    return { users: [], resetTokens: {} };
  }
}

function save(data) {
  ensureDir();
  writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function findUserByUsername(username) {
  const normalized = String(username).trim().toLowerCase();
  return load().users.find(
    (u) => u.usernameLower === normalized || u.username === username
  );
}

export function findUserByEmail(email) {
  const normalized = String(email).trim().toLowerCase();
  return load().users.find(
    (u) => u.emailLower === normalized || u.email === email
  );
}

export function findUserById(id) {
  return load().users.find((u) => u.id === id);
}

export function createUser({ username, email, passwordHash }) {
  const data = load();
  const usernameLower = String(username).trim().toLowerCase();
  const emailLower = String(email).trim().toLowerCase();
  if (data.users.some((u) => u.usernameLower === usernameLower))
    return { ok: false, error: "Username already taken" };
  if (data.users.some((u) => u.emailLower === emailLower))
    return { ok: false, error: "Email already registered" };
  const id = randomBytes(12).toString("hex");
  const user = {
    id,
    username: String(username).trim(),
    usernameLower,
    email: String(email).trim(),
    emailLower,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  data.users.push(user);
  save(data);
  return {
    ok: true,
    user: { id: user.id, username: user.username, email: user.email },
  };
}

export function updatePassword(userId, passwordHash) {
  const data = load();
  const user = data.users.find((u) => u.id === userId);
  if (!user) return false;
  user.passwordHash = passwordHash;
  user.updatedAt = new Date().toISOString();
  save(data);
  return true;
}

export function createResetToken(userId) {
  const data = load();
  const token = randomBytes(32).toString("hex");
  data.resetTokens[token] = {
    userId,
    expiresAt: Date.now() + RESET_TOKEN_EXPIRY_MS,
  };
  save(data);
  return token;
}

export function consumeResetToken(token) {
  const data = load();
  const entry = data.resetTokens[token];
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    delete data.resetTokens[token];
    save(data);
    return null;
  }
  delete data.resetTokens[token];
  save(data);
  return entry.userId;
}

export function seedInitialAdminIfEmpty(passwordHash) {
  const data = load();
  if (data.users.length > 0) return;
  const docUser = process.env.DOCS_USER || "admin";
  const docEmail = (process.env.DOCS_USER || "admin") + "@local";
  const usernameLower = docUser.trim().toLowerCase();
  if (data.users.some((u) => u.usernameLower === usernameLower)) return;
  const id = randomBytes(12).toString("hex");
  data.users.push({
    id,
    username: docUser,
    usernameLower,
    email: docEmail,
    emailLower: docEmail.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  });
  save(data);
}


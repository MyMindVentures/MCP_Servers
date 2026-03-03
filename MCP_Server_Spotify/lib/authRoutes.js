import * as auth from "./auth.js";
import * as authStore from "./authStore.js";

function isPublicAuthPath(pathname, method) {
  if (method !== "GET" && method !== "POST") return false;
  const p = pathname.split("?")[0];
  return (
    p === "/api/auth/signup" ||
    p === "/api/auth/login" ||
    p === "/api/auth/forgot-password" ||
    p === "/api/auth/reset-password"
  );
}

function isProtectedPath(pathname) {
  const p = pathname.split("?")[0];
  return (
    p === "/meta" ||
    p.startsWith("/api/settings") ||
    p === "/api/auth/me" ||
    p === "/api/auth/change-password"
  );
}

export function jwtAuthMiddleware(req, res, next) {
  if (isPublicAuthPath(req.path, req.method)) return next();
  if (req.path === "/mcp") return next();
  if (!isProtectedPath(req.path)) return next();
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const token = authHeader.slice(7);
  const payload = auth.verifyToken(token);
  if (!payload || !payload.userId) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  const user = authStore.findUserById(payload.userId);
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }
  req.user = user;
  next();
}

export function registerAuthRoutes(app) {
  app.post("/api/auth/signup", async (req, res) => {
    const { username, email, password } = req.body || {};
    if (
      !username ||
      typeof username !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }
    const u = username.trim();
    const e = email.trim();
    if (u.length < 2)
      return res
        .status(400)
        .json({ error: "Username must be at least 2 characters" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    const passwordHash = auth.hashPassword(password);
    const result = authStore.createUser({ username: u, email: e, passwordHash });
    if (!result.ok) return res.status(409).json({ error: result.error });
    const token = auth.signToken({ userId: result.user.id });
    return res
      .status(201)
      .json({ token, user: result.user });
  });

  app.post("/api/auth/login", async (req, res) => {
    const { username, email, password } = req.body || {};
    const login = username || email;
    if (
      !login ||
      typeof login !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ error: "Username or email and password are required" });
    }
    const user =
      authStore.findUserByUsername(login) ||
      authStore.findUserByEmail(login);
    if (!user || !auth.comparePassword(password, user.passwordHash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = auth.signToken({ userId: user.id });
    return res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  });

  app.post("/api/auth/forgot-password", async (req, res) => {
    const { email } = req.body || {};
    const e = typeof email === "string" ? email.trim() : "";
    if (!e) return res.status(400).json({ error: "Email is required" });
    const user = authStore.findUserByEmail(e);
    if (!user) {
      return res.json({
        message:
          "If an account exists for this email, you will receive a reset link",
      });
    }
    const token = authStore.createResetToken(user.id);
    const baseUrl =
      process.env.MCP_PUBLIC_URL ||
      `http://127.0.0.1:${process.env.PORT || 3001}`;
    const resetLink = `${baseUrl.replace(
      /\/$/,
      ""
    )}/reset-password?token=${token}`;
    if (process.env.SMTP_HOST || process.env.RESET_PASSWORD_EMAIL_FROM) {
      try {
        const { sendPasswordResetEmail } = await import("./emailReset.js");
        await sendPasswordResetEmail(user.email, resetLink);
      } catch (err) {
        console.error("[auth] Send reset email failed:", err.message);
      }
    }
    return res.json({
      message:
        "If an account exists for this email, you will receive a reset link",
      resetLink: process.env.NODE_ENV === "development" ? resetLink : undefined,
    });
  });

  app.post("/api/auth/reset-password", async (req, res) => {
    const { token, newPassword } = req.body || {};
    if (!token || typeof token !== "string")
      return res.status(400).json({ error: "Reset token is required" });
    if (!newPassword || typeof newPassword !== "string")
      return res.status(400).json({ error: "New password is required" });
    if (newPassword.length < 8)
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    const userId = authStore.consumeResetToken(token);
    if (!userId)
      return res
        .status(400)
        .json({ error: "Invalid or expired reset token" });
    const passwordHash = auth.hashPassword(newPassword);
    if (!authStore.updatePassword(userId, passwordHash))
      return res.status(500).json({ error: "Failed to update password" });
    return res.json({ message: "Password has been reset" });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    return res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  });

  app.post("/api/auth/change-password", async (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || typeof currentPassword !== "string")
      return res
        .status(400)
        .json({ error: "Current password is required" });
    if (!newPassword || typeof newPassword !== "string")
      return res.status(400).json({ error: "New password is required" });
    if (newPassword.length < 8)
      return res.status(400).json({
        error: "New password must be at least 8 characters",
      });
    if (!auth.comparePassword(currentPassword, req.user.passwordHash)) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    const passwordHash = auth.hashPassword(newPassword);
    if (!authStore.updatePassword(req.user.id, passwordHash))
      return res.status(500).json({ error: "Failed to update password" });
    return res.json({ message: "Password has been changed" });
  });
}


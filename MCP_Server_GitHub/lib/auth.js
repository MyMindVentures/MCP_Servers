/**
 * JWT and password helpers for auth API.
 */

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.AUTH_JWT_SECRET || process.env.JWT_SECRET || "change-me-in-production";
const JWT_EXPIRY = process.env.AUTH_JWT_EXPIRY || "7d";
const SALT_ROUNDS = 10;

export function hashPassword(plain) {
  return bcrypt.hashSync(plain, SALT_ROUNDS);
}

export function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

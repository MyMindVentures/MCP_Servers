/**
 * Optional: send password reset email. Set SMTP_* or RESET_PASSWORD_EMAIL_FROM to enable.
 * Otherwise reset link is only returned in response when NODE_ENV=development.
 */

export async function sendPasswordResetEmail(to, resetLink) {
  if (!process.env.RESET_PASSWORD_EMAIL_FROM && !process.env.SMTP_HOST) return;
  // Optional: integrate nodemailer or SendGrid here
  console.error("[auth] Email send not configured; set SMTP_* or use reset link from response");
}

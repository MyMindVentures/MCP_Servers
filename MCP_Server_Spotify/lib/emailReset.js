export async function sendPasswordResetEmail(to, resetLink) {
  if (!process.env.RESET_PASSWORD_EMAIL_FROM && !process.env.SMTP_HOST) return;
  console.error(
    "[auth] Email send not configured; set SMTP_* or use reset link from response"
  );
}


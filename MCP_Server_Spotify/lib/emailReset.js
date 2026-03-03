export async function sendPasswordResetEmail(to, resetLink) {
  // If neither a from-address nor SMTP host is configured, we cannot send email.
  if (!process.env.RESET_PASSWORD_EMAIL_FROM && !process.env.SMTP_HOST) {
    console.error(
      "[auth] Email send not configured; set SMTP_* or RESET_PASSWORD_EMAIL_FROM, or use the reset link from the API response in development"
    );
    return;
  }

  // Email transport is intentionally not implemented here; integrate your own
  // provider (e.g. nodemailer, SendGrid) using the configured SMTP_* settings.
}


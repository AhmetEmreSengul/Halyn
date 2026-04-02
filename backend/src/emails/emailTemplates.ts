import { ENV } from "../lib/env";

export function createPasswordResetEmailTemplate(resetToken: string) {
  const resetUrl = `${ENV.CLIENT_URL}/reset-password/${resetToken}`;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset</title>
  </head>

  <body style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f4f7f5;
    padding: 20px;
    color: #1f2937;
    max-width: 600px;
    margin: 0 auto;
  ">

    <!-- Header -->
    <div style="
      background: linear-gradient(to right, #16a34a, #22c55e);
      padding: 28px;
      text-align: center;
      border-radius: 12px 12px 0 0;
    ">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/845/845646.png" 
        alt="Check Icon"
        style="width: 70px; height: 70px; margin-bottom: 12px;"
      />
      <h1 style="
        color: white;
        font-size: 24px;
        margin: 0;
        font-weight: 600;
        letter-spacing: 0.3px;
      ">
        Reset Your Password
      </h1>
      <p style="
        color: #dcfce7;
        font-size: 14px;
        margin-top: 8px;
      ">
        Secure your account and continue scanning with confidence
      </p>
    </div>

    <!-- Content -->
    <div style="
      background-color: #ffffff;
      padding: 32px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    ">

      <p style="font-size: 16px; margin-bottom: 16px;">
        We received a request to reset your password.
      </p>

      <p style="font-size: 15px; color: #4b5563;">
        Click the button below to set a new password. For your security, this link will expire shortly.
      </p>

      <!-- Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a 
          href="${resetUrl}" 
          style="
            background: linear-gradient(to right, #16a34a, #22c55e);
            color: #ffffff;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 15px;
            display: inline-block;
            box-shadow: 0 4px 10px rgba(34,197,94,0.3);
          ">
          Reset Password
        </a>
      </div>

      <!-- Fallback -->
      <div style="
        background-color: #f0fdf4;
        padding: 18px;
        border-radius: 10px;
        margin-top: 20px;
        border-left: 4px solid #22c55e;
      ">
        <p style="margin: 0 0 8px; font-size: 13px; color: #166534;">
          If the button doesn’t work, use this link:
        </p>
        <p style="
          word-break: break-all;
          font-size: 12px;
          color: #15803d;
        ">
          ${resetUrl}
        </p>
      </div>

      <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="margin-top: 24px; margin-bottom: 0;">
        — The <strong>Halyn Team ✔️</strong>
      </p>

    </div>

    <!-- Footer -->
    <div style="
      text-align: center;
      padding: 18px;
      color: #9ca3af;
      font-size: 12px;
    ">
      <p>© 2026 Halyn. All rights reserved.</p>
      <p>
        <a href="#" style="color: #16a34a; text-decoration: none; margin: 0 8px;">Privacy</a>
        <a href="#" style="color: #16a34a; text-decoration: none; margin: 0 8px;">Terms</a>
        <a href="#" style="color: #16a34a; text-decoration: none; margin: 0 8px;">Contact</a>
      </p>
    </div>

  </body>
  </html>
  `;
}

export function createPasswordResetSuccessEmailTemplate(userEmail: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Updated</title>
  </head>

  <body style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f4f7f5;
    padding: 20px;
    color: #1f2937;
    max-width: 600px;
    margin: 0 auto;
  ">

    <!-- Header -->
    <div style="
      background: linear-gradient(to right, #16a34a, #22c55e);
      padding: 28px;
      text-align: center;
      border-radius: 12px 12px 0 0;
    ">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png" 
        alt="Success Check"
        style="width: 70px; height: 70px; margin-bottom: 12px;"
      />
      <h1 style="
        color: white;
        font-size: 24px;
        margin: 0;
        font-weight: 600;
      ">
        Password Updated
      </h1>
      <p style="
        color: #dcfce7;
        font-size: 14px;
        margin-top: 8px;
      ">
        Your account is now secure ✔️
      </p>
    </div>

    <!-- Content -->
    <div style="
      background-color: #ffffff;
      padding: 32px;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    ">

      <p style="font-size: 16px; margin-bottom: 12px;">
        Your password has been successfully changed.
      </p>

      <p style="font-size: 14px; color: #4b5563;">
        This change applies to the account associated with:
      </p>

      <!-- Email Highlight -->
      <div style="
        background-color: #f0fdf4;
        padding: 16px;
        border-radius: 10px;
        margin: 18px 0;
        border-left: 4px solid #22c55e;
      ">
        <p style="
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #166534;
          word-break: break-all;
        ">
          ${userEmail}
        </p>
      </div>

      <p style="font-size: 14px; color: #374151;">
        If you made this change, no further action is required.
      </p>

      <!-- Warning -->
      <div style="
        margin-top: 22px;
        padding: 16px;
        background-color: #fef2f2;
        border-radius: 8px;
        border-left: 4px solid #ef4444;
      ">
        <p style="
          margin: 0;
          font-size: 13px;
          color: #991b1b;
        ">
          <strong>Didn’t make this change?</strong><br/>
          Reset your password immediately and contact support.
        </p>
      </div>

      <!-- Security Tip -->
      <div style="
        margin-top: 18px;
        padding: 14px;
        background-color: #f9fafb;
        border-radius: 8px;
        border: 1px dashed #d1d5db;
      ">
        <p style="
          margin: 0;
          font-size: 13px;
          color: #6b7280;
        ">
          Tip: Use a strong, unique password to keep your account safe.
        </p>
      </div>

      <p style="margin-top: 28px; margin-bottom: 0;">
        — <strong>Halyn Team ✔️</strong>
      </p>

    </div>

    <!-- Footer -->
    <div style="
      text-align: center;
      padding: 18px;
      color: #9ca3af;
      font-size: 12px;
    ">
      <p>© 2026 Halyn. All rights reserved.</p>
      <p>
        <a href="#" style="color: #16a34a; text-decoration: none; margin: 0 8px;">Privacy</a>
        <a href="#" style="color: #16a34a; text-decoration: none; margin: 0 8px;">Terms</a>
        <a href="#" style="color: #16a34a; text-decoration: none; margin: 0 8px;">Contact</a>
      </p>
    </div>

  </body>
  </html>
  `;
}

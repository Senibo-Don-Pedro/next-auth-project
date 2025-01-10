// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// // const domain = process.env.NEXT_PUBLIC_APP_URL;

// // export const sendPasswordResetEmail = async (email: string, token: string) => {
// //   const resetLink = `${domain}/auth/new-password?token=${token}`;

// //   await resend.emails.send({
// //     from: "onboarding@resend.dev",
// //     to: email,
// //     subject: "Reset your password",
// //     html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
// //   });
// // };

// export const sendVerificationEmail = async (email: string, token: string) => {
//   // const confirmLink = `${domain}/auth/new-verification?token=${token}`;
//   const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Confirm your email",
//     html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
//   });
// };

// export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "2FA Code",
//     html: `<p>Your 2FA code: ${token}</p>`,
//   });
// };

import nodemailer from "nodemailer";

const appUrl = "http://localhost:3000";

const transporter = nodemailer.createTransport({
  service: "gmail", // Or "smtp-relay.sendinblue.com" for Brevo
  auth: {
    user: process.env.SMTP_EMAIL, // Your Gmail address or Brevo email
    pass: process.env.SMTP_PASSWORD, // App password for Gmail or API key for Brevo
  },
});

const fromEmail = `noreply@${process.env.SMTP_EMAIL}`;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${appUrl}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${appUrl}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    from: fromEmail,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

import { Email } from "@convex-dev/auth/providers/Email";
import { alphabet, generateRandomString } from "oslo/crypto";
import { Resend as ResendAPI } from "resend";

export const PasswordReset = Email({
  id: "resend-otp-password-reset",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "LaBiblio <onboarding@wgprojects.site>",
      to: [email],
      subject: "Redefinir senha - laBiblio",
      text: `Seu código para redefinir a senha é: ${token}`,
    });
    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});
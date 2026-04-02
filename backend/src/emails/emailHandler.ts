import * as Brevo from "@getbrevo/brevo";
import { ENV } from "../lib/env";
import {
  createPasswordResetEmailTemplate,
  createPasswordResetSuccessEmailTemplate,
} from "./emailTemplates";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  ENV.BREVO_API_KEY!,
);

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: {
        name: "Halyn",
        email: "ahmetemresengul.34@gmail.com",
      },
      to: [{ email }],
      subject: "Password Reset",
      htmlContent: createPasswordResetEmailTemplate(token),
    });
  } catch (error: any) {
    console.error("Error sending password reset email", error.message);
  }
};

export const sendPasswordResetEmailSuccess = async (email: string) => {
  try {
    await apiInstance.sendTransacEmail({
      sender: {
        name: "Halyn",
        email: "ahmetemresengul.34@gmail.com",
      },
      to: [{ email }],
      subject: "Password Reset Success",
      htmlContent: createPasswordResetSuccessEmailTemplate(email),
    });
  } catch (error) {
    console.error("Error sending password reset success email", error);
  }
};

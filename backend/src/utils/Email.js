import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.SMTP_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await apiInstance.sendTransacEmail({
      sender: { email: process.env.SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent successfully:", response.messageId || response);
    return response;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Failed to send verification email");
  }
};

import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../models/contact.model.js";
import transporter from "../utils/nodemailer.js";
import validator from "validator";
import isDomainValid from "../utils/EmailCheck.js";

const createContact = asyncHandler(async (req, res) => {
  let { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "Please Fill All The Fields");
  }
  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Invalid Email Format");
  }
  if (!(await isDomainValid(email))) {
    throw new ApiError(400, "Invalid Email Address");
  }
  let contact = await Contact.create({
    name,
    email,
    subject,
    message,
  });
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: `${subject}`,
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2563EB;">Thank You for Your Feedback!</h2>
      <p>Hello,</p>
      <p>We have received your feedback submitted with the email: <strong>${email}</strong>.</p>
      <p>Our team will review your message and get back to you as soon as possible.</p>
      <p>We truly appreciate your input and value your time.</p>
      <br>
      <p>Best regards,<br>The MyBlog Team</p>
    </div>
  `,
  };

  await transporter.sendMail(mailOptions);
  return res
    .status(200)
    .json(new ApiResponse(200, "Message Sent Successfully", contact));
});

export { createContact };

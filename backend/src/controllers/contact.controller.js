import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../models/contact.model.js";
import { sendEmail } from "../utils/Email.js";
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
  await sendEmail({
    to: contact.email,
    subject: "FeedBack Received",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #2563EB;">Welcome to MyBlog!</h2>
        <p>Hello,</p>
        <p>Your feedback has been received.</p>
        <p>We will come back shortly to response your feedback</p>
        <br>
        <p>Thank you,<br>The MyBlog Team</p>
      </div>
    `,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Message Sent Successfully", contact));
});

export { createContact };

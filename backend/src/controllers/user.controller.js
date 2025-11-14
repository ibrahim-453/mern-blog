import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/Email.js";
import validator from "validator";
import isDomainValid from "../utils/EmailCheck.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,                            
  secure: true,                       
  sameSite: isProduction ? "none" : "lax",    
  domain: isProduction ? "mern-blog-backend-yoak.onrender.com" : "localhost",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,           
};


const signup = asyncHandler(async (req, res) => {
  let { fullname, username, email, password } = req.body;
  if (
    [fullname, username, email, password].some((field) => field.trim() == "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }
  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Invalid Email Format");
  }
  if (!(await isDomainValid(email))) {
    throw new ApiError(400, "Invalid Email Address");
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(400, "User Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpexpiry = Date.now() + 10 * 60 * 1000;

  let createdUser = await User.create({
    fullname,
    username,
    email,
    password: hash,
    isVerificationToken: otp,
    isVerificationTokenExpiresAt: otpexpiry,
  });
  await sendEmail({
    to: createdUser.email,
    subject: "Verify Your Email for MyBlog",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2563EB;">Welcome to MyBlog!</h2>
      <p>Hello,</p>
      <p>Your account has been successfully created with the email: <strong>${createdUser.email}</strong>.</p>
      <p>Please use the following OTP to verify your email address:</p>
      <p style="font-size: 1.5em; font-weight: bold; color: #1E40AF;">${otp}</p>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
      <br>
      <p>Thank you,<br>The MyBlog Team</p>
    </div>
  `,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Account Created. Verification code sent to your provided email",
        createdUser
      )
    );
});

const verifyemail = asyncHandler(async (req, res) => {
  let { email, otp } = req.body;
  if (otp == "") {
    throw new ApiError(400, "Otp is required");
  }
  let user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  if (user.isVerified) {
    return res
      .status(200)
      .json(new ApiResponse(200, "User Already verified", {}));
  }
  if (
    user.isVerificationToken !== otp ||
    Date.now() > user.isVerificationTokenExpiresAt ||
    !user.isVerificationToken
  ) {
    throw new ApiError(400, "Invalid or Otp Already Expired");
  }

  user.isVerified = true;
  user.isVerificationToken = "";
  user.isVerificationTokenExpiresAt = undefined;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Email Verified Successfully", {}));
});

const signin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if ([email, password].some((field) => field.trim() == "")) {
    throw new ApiError(500, "All Fields are required");
  }
  let user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email before logging in");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError(400, "Invalid User Crendentials");
  }
  let accessToken = jwt.sign(
    { email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  res.cookie("accessToken", accessToken, cookieOptions);

  let loggedInuser = await User.findById(user._id).select("-password");
  return res.status(200).json(
    new ApiResponse(200, "Login Successfull", {
      user: loggedInuser,
      accessToken,
    })
  );
});

const googleauth = asyncHandler(async (req, res) => {
  const { fullname, email, googlePhoto } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    let accessToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    res.cookie("accessToken", accessToken, cookieOptions);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Login Sucessfull", { user: user, accessToken })
      );
  } else {
    const generatePassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hash = await bcrypt.hash(generatePassword, 10);
    const googleUser = await User.create({
      fullname,
      username:
        fullname.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-3),
      email,
      password: hash,
      profilephoto: googlePhoto,
    });
    await googleUser.save();
    let accessToken = jwt.sign(
      { email: googleUser.email, role: googleUser.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    res.cookie("accessToken", accessToken, cookieOptions);
    return res.status(200).json(
      new ApiResponse(200, "Login Sucessfull", {
        user: googleUser,
        accessToken,
      })
    );
  }
});

const signout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, "Logout Successfull", {}));
});

const resettoken = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  const resetToken = Math.floor(100000 + Math.random() * 900000);
  const resetTokenExpiry = Date.now() + 10 * 60 * 1000;

  user.resetToken = resetToken;
  user.resetTokenExpiresAt = resetTokenExpiry;
  await sendEmail({
    to: user.email,
    subject: "OTP For Change Password",
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2563EB;">OTP CODE</h2>
      <p>Hello,</p>
      <p>Your request to change has been granted</p>
      <p>Please use the following OTP to verify your request :</p>
      <p style="font-size: 1.5em; font-weight: bold; color: #1E40AF;">${resetToken}</p>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
      <br>
      <p>Thank you,<br>The MyBlog Team</p>
    </div>
  `,
  });
  await user.save();
  return res.status(200).json(new ApiResponse(200, "Otp Sent to your email"));
});

const resettokenverification = asyncHandler(async (req, res) => {
  let { resetToken } = req.body;
  let user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  if (
    !user.resetToken ||
    user.resetToken !== resetToken ||
    Date.now() > user.resetTokenExpiresAt
  ) {
    throw new ApiError(400, "Invalid or Otp Already Expired");
  }
  user.isResetTokenVerified = true;
  user.resetToken = "";
  user.resetTokenExpiresAt = undefined;
  await user.save();
  return res.status(200).json(new ApiResponse(200, "Reset Token Verified", {}));
});
const changepassword = asyncHandler(async (req, res) => {
  let { newPassword } = req.body;
  if (!newPassword) {
    throw new ApiError(400, "Please Fill all the fields");
  }
  let user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "Please Login");
  }
  if (!user.isResetTokenVerified) {
    throw new ApiError(400, "Unauthorized Request");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);
  user.password = hash;
  user.isResetTokenVerified = false;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, "Password Changed Successfully"));
});

const changeprofilepic = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  if (!req.file) {
    throw new ApiError(400, "Profile Photo required");
  }
  const profilepath = req.file.path;
  const uploadedphoto = await uploadOnCloudinary(profilepath);

  user.profilephoto = uploadedphoto.url;
  await user.save();
  return res.status(200).json(
    new ApiResponse(200, "Profile Photo Updated", {
      profilephoto: uploadedphoto.url,
    })
  );
});

const deleteuser = asyncHandler(async (req, res) => {
  let { userId } = req.params;
  if (req.user.role !== "admin") {
    throw new ApiError(400, "Unauthorized Request");
  }
  const deletedUser = await User.findByIdAndDelete(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "User Deleted", deletedUser));
});

const getusers = asyncHandler(async (req, res) => {
  if (!req.user.role == "admin") {
    throw new ApiError(400, "Unauthorized Request");
  }
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limiy) || 9;
  const sortDirection = req.query.order == "asc" ? 1 : -1;

  const users = await User.find()
    .sort({ updatedAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

  const totalusers = await User.countDocuments();
  const now = new Date();
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  const lastMonth = await User.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  return res.status(200).json(
    new ApiResponse(200, "All Users Fetched", {
      users,
      totalusers,
      lastMonth,
    })
  );
});

export {
  signup,
  signin,
  signout,
  googleauth,
  verifyemail,
  resettoken,
  resettokenverification,
  changepassword,
  changeprofilepic,
  getusers,
  deleteuser,
};

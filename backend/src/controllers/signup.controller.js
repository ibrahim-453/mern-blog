import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHander from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  path: "/",
};

const signup = asyncHander(async (req, res) => {
  let { fullname, username, email, password } = req.body;
  if (
    [fullname, username, email, password].some((field) => field.trim() == "")
  ) {
    throw new ApiError(500, "All Fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(400, "User Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  let createdUser = await User.create({
    fullname,
    username,
    email,
    password: hash,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Account Created", createdUser));
});

const signin = asyncHander(async (req, res) => {
  let { username, password } = req.body;

  if ([username, password].some((field) => field.trim() == "")) {
    throw new ApiError(500, "All Fields are required");
  }
  let user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError(400, "Invalid User Crendentials");
  }
  let accessToken = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  res.cookie("accessToken", accessToken, cookieOptions);

  let loggedInuser = await User.findById(user._id).select("-password");
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Login Successfull", {
        user: loggedInuser,
        accessToken,
      })
    );
});

const signout = asyncHander(async (req, res) => {
  // let user = await User.findOne(req.user._id)
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, "Logout Successfull", {}));
});

export { signup, signin, signout };

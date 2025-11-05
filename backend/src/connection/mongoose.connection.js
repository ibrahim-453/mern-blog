import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import debug from "debug";

const dbgr = debug("development:mongoose");

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    dbgr("Using existing MongoDB connection");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
      // No options needed for modern Mongoose
    );

    isConnected = connectionInstance.connections[0].readyState === 1;
    dbgr(`Database connected at ${connectionInstance.connection.host}`);
  } catch (error) {
    dbgr(`Database connection failed: ${error.message}`);
    throw error;
  }
};

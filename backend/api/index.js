import { app } from "../src/app.js";
import { connectDB } from "../src/connection/mongoose.connection.js";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env" });

let isConnected = false;
const connectOnce = async () => {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
};

export default async function handler(req, res) {
  await connectOnce();
  return app(req, res);
}

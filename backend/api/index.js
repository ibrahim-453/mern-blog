// api/index.js or vercel-serverless entry
import { app } from "../src/app.js";
import { connectDB } from "../src/connection/mongoose.connection.js";

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ message: error.message });
  }
}


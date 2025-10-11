import { app } from "../src/app.js";
import { connectDB } from "../src/connection/mongoose.connection.js";

// No dotenv here; Vercel injects env variables automatically
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

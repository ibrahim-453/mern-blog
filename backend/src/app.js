import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import blogRouter from './routes/blog.routes.js';
import commentRouter from './routes/comment.routes.js';
import contactRouter from './routes/contact.routes.js';

const allowedOrigins = [
  process.env.CORS_ORIGIN,
  process.env.CORS_ORIGIN_PRODUCTION
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman) or if origin is in allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/contact", contactRouter);

export { app };

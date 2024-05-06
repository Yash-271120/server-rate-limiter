import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT, MONGODB_URI } from "./config/config";
import authRoutes from "./src/routes/authRoutes";
import userRoutes from "./src/routes/userRoutes";
import RateLimiter from "./src/classes/rateLimiter";

const app = express();

RateLimiter.init();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to database");
});

app.use((req: Request, res: Response, next) => {
  const limit = 5; // Maximum 5 requests allowed
  const countPerLimit = 60; // 1 request per 60 seconds
  const limitByKey = req.ip || ""; // Rate limit by IP address

  if (!RateLimiter.throttle(limit, countPerLimit, limitByKey)) {
    return res.status(429).send("Too Many Requests");
  }

  next();
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

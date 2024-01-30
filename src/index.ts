import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to databse", process.env.MONGODB_URL));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("app listen to 8000");
});

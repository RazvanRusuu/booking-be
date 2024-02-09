import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import hotelsRouter from "./routes/myHotels";

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
app.use("/api/hotels", hotelsRouter);

app.listen(8000, () => {
  console.log("app listen to 8000");
});

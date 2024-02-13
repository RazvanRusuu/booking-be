import express from "express";
import { verifyToken } from "../middleware/auth";
import { addHotels, uploadImages } from "../controllers/my-hotels";

const router = express.Router();

router.route("/my-hotels").post(verifyToken, uploadImages, addHotels);

export default router;

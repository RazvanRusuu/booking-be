import express from "express";
import { verifyToken } from "../middleware/auth";
import { addHotels } from "../controllers/myHotelsController";

const router = express.Router();

router.route("/my-hotels").post(verifyToken, addHotels);

export default router;

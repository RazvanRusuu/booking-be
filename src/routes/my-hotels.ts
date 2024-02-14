import express from "express";
import { verifyToken } from "../middleware/auth";
import { addHotels, uploadImages } from "../controllers/my-hotels";
import { body } from "express-validator";

const router = express.Router();

const validateBody = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  body("facilities").notEmpty().isArray().withMessage("Facilities is required"),
];

router.post("/", verifyToken, validateBody, uploadImages, addHotels);

export default router;

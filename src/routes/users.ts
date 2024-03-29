import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/user";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required and must be min 6 length").isLength(
      { min: 6 }
    ),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Field error", fieldErrors: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({
          message: "A user with this mail already exist",
          fieldErrors: [
            { msg: "A user with this mail already exist", path: "email" },
          ],
        });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86500000,
      });

      return res.status(200).json({
        message: "Successfully register",
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;

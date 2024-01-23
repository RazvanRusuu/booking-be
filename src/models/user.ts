import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type TUser = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "A user must have a email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model<TUser>("User", userSchema);

export default User;

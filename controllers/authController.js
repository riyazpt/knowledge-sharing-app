import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { validationResult } from "express-validator";

export const showRegisterUser = async (req, res) => {
  return res.render("register");
};
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  const formData = req.body;

  if (!errors.isEmpty()) {
    return res.render("register", {
      errorMessage: errors.array(),
      formData,
    });
  }
  const { name, email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });
    req.flash("success", "User  Registerd");
    res.redirect("/user/login");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Username already exists" });
    }
    return res.status(500).json({ message: "Internal server error" + err });
  }
};

export const userLogin = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

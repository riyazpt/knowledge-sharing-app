import express from "express";
import {
  registerUser,
  showRegisterUser,
  userLogin,
} from "../controllers/authController.js";
import { validateUserRegistration } from "../validations/authValidatior.js";
import passport from "passport";
const articleRoute = express.Router();

articleRoute.get("/register", showRegisterUser);
articleRoute.post("/register", validateUserRegistration, registerUser);
articleRoute.get("/login", userLogin);
articleRoute.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
);
articleRoute.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/user/login");
  });
});

export default articleRoute;

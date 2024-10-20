import { check } from "express-validator";

export const validateUserRegistration = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("Name is required and must be at least 2 characters long."),

  check("email").isEmail().withMessage("A valid email address is required."),

  check("username")
    .isLength({ min: 3 })
    .withMessage("Username is required and must be at least 3 characters long.")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers."),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password is required and must be at least 6 characters long.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[a-zA-Z]/)
    .withMessage("Password must contain at least one letter."),
];

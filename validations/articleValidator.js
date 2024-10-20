import { check } from "express-validator";

export const validateArticle = [
  check("title")
    .isLength({ min: 5 })
    .withMessage("Title is required and must be at least 5 characters long."),

  check("body")
    .isLength({ min: 5 })
    .withMessage("Body is required and must be at least 10 characters long."),
];

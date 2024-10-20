import express from "express";
import { validateArticle } from "../validations/articleValidator.js";

import {
  getArticle,
  showSaveArticleForm,
  saveArticle,
  getArticleById,
  viewEditArticle,
  editArticle,
  deleteArticle,
} from "../controllers/articleController.js";
const articleRoute = express.Router();

articleRoute.get("/", getArticle);
articleRoute.get("/articles", ensureAuthenticated, showSaveArticleForm);
articleRoute.post(
  "/articles",
  ensureAuthenticated,
  validateArticle,
  saveArticle,
);
articleRoute.get("/article/:id", getArticleById);
articleRoute.get("/article/edit/:id", ensureAuthenticated, viewEditArticle);
articleRoute.put("/article/edit/:id", ensureAuthenticated, editArticle);
articleRoute.delete("/article/:id", ensureAuthenticated, deleteArticle);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("danger", "Please Login");
  res.redirect("/user/login");
}
export default articleRoute;

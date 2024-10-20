import Article from "../models/articles.model.js";
import User from "../models/user.model.js";

import { validationResult } from "express-validator";

export const getArticle = async (req, res) => {
  try {
    const articles = await Article.find();

    res.render("index", {
      articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
export const showSaveArticleForm = (req, res) => {
  try {
    res.render("new_article");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
export const saveArticle = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("new_article", {
      errorMessage: errors.array(),
      formData: req.body,
    });
  } else {
    User.find;
    const newArticle = new Article({
      title: req.body.title,
      body: req.body.body,
      author: req.user._id,
    });

    try {
      await newArticle.save();
      req.flash("success", "Article added");
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
export const getArticleById = async (req, res) => {
  try {
    let slug = req.params.id;
    const articles = await Article.findById({ _id: slug });
    const user = await User.findById(articles.author);

    res.render("article", {
      articles: articles,
      author: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
export const viewEditArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    if (article.author != req.user._id) {
      req.flash("dander", "not autherized");
      res.redirect(`/articles`);
    }

    res.render("edit_article", {
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const editArticle = async (req, res) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      author: req.user._id,
      body: req.body.body,
    });
    req.flash("success", "Article Edited");
    res.redirect(`/articles`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteArticle = async (req, res) => {
  try {
    if (!req.user._id) {
      res.status(500).send();
    }
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

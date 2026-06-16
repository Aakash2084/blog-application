const express = require("express");
const Blog = require("../model/blog");
const Comment = require("../model/comment");
const User = require("../model/user");

const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
  let user = null;

  if (req.user) {
    user = await User.findById(req.user._id);
  }

  const blogs = await Blog.find({});

  return res.render("home", {
    blogs,
    user,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    error: null,
    success: null
  });
});

router.get("/signin", (req, res) => {
  res.render("signin", {
    success: null,
    error: null
  });
});

router.get("/add-blog", (req, res) => {
  return res.render("addBlog");
});

router.get("/view-blog/:id", async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy",
  );

  return res.render("blog", {
    blog,
    comments,
    user,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/signin");
});

router.post("/delete/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});
router.get("/profile", async (req, res) => {
  const user = await User.findById(req.user._id);

  res.render("profile", { user });
});

router.get("/edit-profile", async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.render("editProfile", { user });
});

module.exports = router;

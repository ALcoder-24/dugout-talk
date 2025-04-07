import express from "express";
import Post from "../models/Post.js";
import {
  createPost,
  getPlayerPosts,
  getCreatePost,
  getAllPosts,
} from "../controllers/postController.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { checkPostOwner } from "../Middleware/checkPostOwner.js";

const router = express.Router();

router.get("/player/:id", isAuthenticated, getPlayerPosts); 

router.post("/player/:id", isAuthenticated, createPost); 

router.get("/", getAllPosts); 

router.get("/create", isAuthenticated, getCreatePost);
router.post("/", isAuthenticated, createPost);

router.get("/:id/edit", isAuthenticated, checkPostOwner, async (req, res) => {
  const post = await Post.findById(req.params.id).populate("player_id");
  res.render("editPost", { post });
});

router.post("/:id/edit", isAuthenticated, checkPostOwner, async (req, res) => {
  const { content } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { content });
  res.redirect("/dashboard");
});

router.post(
  "/:id/delete",
  isAuthenticated,
  checkPostOwner,
  async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  }
);

export default router;

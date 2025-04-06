// routes/postRoutes.js
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

// Route to display posts about a player
router.get("/player/:id", isAuthenticated, getPlayerPosts); // Display posts related to a specific player

// Route to create a post about a player
router.post("/player/:id", isAuthenticated, createPost); // User creates a post for that player

// Route for viewing all posts (for guests and authenticated users)
router.get("/", getAllPosts); // This will show all posts (whether user is logged in or not)

// Route for creating a post (only authenticated users can access this)
router.get("/create", isAuthenticated, getCreatePost);
router.post("/", isAuthenticated, createPost);

router.get("/:id/edit", isAuthenticated, checkPostOwner, async (req, res) => {
  const post = await Post.findById(req.params.id).populate("player_id");
  res.render("editPost", { post });
});

// Handle edit submission
router.post("/:id/edit", isAuthenticated, checkPostOwner, async (req, res) => {
  const { content } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { content });
  res.redirect("/dashboard");
});

// Delete a post
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

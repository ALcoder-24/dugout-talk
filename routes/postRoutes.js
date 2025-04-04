// routes/postRoutes.js
import express from "express";
import { createPost, getPlayerPosts, getCreatePost ,getAllPosts } from "../controllers/postController.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js"; 

const router = express.Router();

// Route to display posts about a player
router.get("/player/:id", isAuthenticated, getPlayerPosts); // Display posts related to a specific player

// Route to create a post about a player
router.post("/player/:id", isAuthenticated, createPost); // User creates a post for that player

// Route for viewing all posts (for guests and authenticated users)
router.get("/", getAllPosts);  // This will show all posts (whether user is logged in or not)

// Route for creating a post (only authenticated users can access this)
router.get("/create", isAuthenticated, getCreatePost);
router.post("/", isAuthenticated, createPost);


export default router;

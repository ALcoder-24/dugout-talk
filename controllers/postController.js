// controllers/postController.js
import Post from "../models/Post.js";
import Player from "../models/Player.js";
import User from "../models/User.js";

// Controller function to get posts for a specific player
export const getPlayerPosts = async (req, res) => {
    const playerId = req.params.id;
    const userId = req.session.user._id;

    try {
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).send("Player not found");
        }

        // Get all posts about this player
        const posts = await Post.find({ player_id: playerId }).populate("user_id");

        // Render the player's page with posts and the option to create a post if not done already
        res.render("playerPosts", {
            player,
            posts,
        });
    } catch (err) {
        res.status(500).send("Error fetching player posts");
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("player_id").populate("user_id");
        res.render("posts", { posts });  // Assuming you have a 'posts.ejs' view to display posts
    } catch (err) {
        res.status(500).send("Error fetching posts");
    }
};


// Controller function to handle creating a new post about a player
export const createPost = async (req, res) => {
    const { content } = req.body;
    const playerId = req.params.id;
    const userId = req.session.user._id;

    try {
        const newPost = new Post({
            user_id: userId,
            player_id: playerId,
            content,
        });
        await newPost.save();

        res.redirect(`/posts/player/${playerId}`); // Redirect to the player’s post page
    } catch (err) {
        res.status(500).send("Error creating post");
    }
};

// Optionally, you can add getCreatePost() here if you want a form to create posts directly.
// controllers/postController.js

export const getCreatePost = async (req, res) => {
    try {
        const users = await User.find();  // If needed for your form
        const players = await Player.find();  // If needed for your form
        res.render("createPost", { users, players });
    } catch (err) {
        res.status(500).send("Error fetching data for create post");
    }
};

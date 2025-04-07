import Post from "../models/Post.js";
import Player from "../models/Player.js";
import User from "../models/User.js";

export const getPlayerPosts = async (req, res) => {
  const playerId = req.params.id;
  const userId = req.session.user._id;

  try {
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).send("Player not found");
    }

    const posts = await Post.find({ player_id: playerId }).populate("user_id");

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
    res.render("posts", { posts }); 
  } catch (err) {
    res.status(500).send("Error fetching posts");
  }
};

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

    res.redirect(`/posts/player/${playerId}`); 
  } catch (err) {
    res.status(500).send("Error creating post");
  }
};


export const getCreatePost = async (req, res) => {
  try {
    const users = await User.find(); 
    const players = await Player.find(); 
    res.render("createPost", { users, players });
  } catch (err) {
    res.status(500).send("Error fetching data for create post");
  }
};

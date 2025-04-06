// Middleware/checkPostOwner.js
import Post from "../models/Post.js";

export const checkPostOwner = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.session.user._id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.user_id.toString() !== userId) {
      return res.status(403).send("Unauthorized");
    }

    next();
  } catch (err) {
    res.status(500).send("Server error");
  }
};

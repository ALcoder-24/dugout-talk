import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  player_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  content: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

export default Post;

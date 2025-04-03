import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Player from "./models/Player.js";
import Post from "./models/Post.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true, 
})

.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error ("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.get("/users", async (req, res) => {
    try{
        const users = await User.find();
        res.render("users", { users});
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
});

app.get("/players", async (req, res) => {
    try{
        const players = await Player.find();
        res.render("players", { players});
    } catch (err) {
        res.status(500).send("Error fetching players");
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find().populate("user_id").populate("player_id");
        console.log("Fetched Posts:", posts);
        res.render("posts", { posts});
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).send("Error fetching posts");
    }
});

app.get("/posts/create", async (req, res) => {
    try {
        const users = await User.find();
        const players = await Player.find();
        res.render("createPost", { users, players });
    } catch (err) {
        res.status(500).send("Error fetching users or players");
    }
});

app.post("/posts", async (req, res) => {
    try {
        const { user_id, player_id, content } = req.body;

        const newPost = new Post({
            user_id: user_id,
            player_id: player_id, 
            content: content,
        });

        await newPost.save();
        console.log("New post created!");

        res.redirect("/posts");
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).send("Error creating post");
    }
});


app.listen(3000, () => console.log("Server running on port 3000"));

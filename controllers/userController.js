import User from "../models/User.js";
import Post from "../models/Post.js";
import Player from "../models/Player.js";
import bcrypt from "bcrypt";

export const getLogin = (req, res) => {
  res.render("login");
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(400).send("Invalid credentials");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      console.log("Incorrect password");
      return res.status(400).send("Invalid credentials");
    }

    req.session.user = {
      _id: user._id,
      username: user.username,
    };

    console.log("Login successful — saving session...");

    req.session.save(() => {
      return res.redirect("/dashboard");
    });
  } catch (err) {
    console.error("Error logging in:", err);
    return res.status(500).send("Error logging in");
  }
};

export const getRegister = (req, res) => {
  res.render("register"); 
};

export const register = async (req, res) => {
  try {

    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .send("Username already exists. Please choose another one.");
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    req.session.user = {
      _id: newUser._id,
      username: newUser.username,
    };


    req.session.save(() => {
      res.redirect("/dashboard");
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user");
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export const getDashboard = async (req, res) => {
  try {
    const userId = req.session.user._id;

    if (!userId) {
      return res.redirect("/auth/login"); 
    }

    const userPosts = await Post.find({ user_id: userId }).populate(
      "player_id"
    );

    const players = await Player.find();

    return res.render("dashboard", {
      userPosts,
      user: req.session.user,
    });
  } catch (err) {
    res.status(500).send("Error loading dashboard");
  }
};

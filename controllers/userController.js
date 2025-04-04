// controllers/userController.js
import User from "../models/User.js";
import Post from "../models/Post.js";
import Player from "../models/Player.js";
import bcrypt from "bcrypt";


// Show the login page
export const getLogin = (req, res) => {
    res.render("login");
};

// Handle login
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
            username: user.username
        };
        // Log the session after setting userId to confirm the change
        console.log("Session after setting userId:", req.session);  // Log after setting userId


        console.log("Login successful! Redirecting to dashboard.");
        res.redirect("/dashboard");
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).send("Error logging in");
    }
};



// Show the registration page
export const getRegister = (req, res) => {
    res.render("register"); // Ensure you have a register.ejs file
};

// Handle registration
export const register = async (req, res) => {
    try {
        console.log("Register request received:", req.body); // Debugging

        const { username, password } = req.body;

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("Username already taken");
            return res.status(400).send("Username already exists. Please choose another one.");
        }

        // Hash password
        
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword); // Debugging

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Store user session
        req.session.user = {
            _id: newUser._id,
            username: newUser.username
        }

        console.log("User registered successfully");
        res.redirect("/dashboard");
        

    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Error registering user");
    }
};


// Handle logout
export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

// Show the dashboard
export const getDashboard = async (req, res) => {
    try {
        const userId = req.session.user._id;

        if (!userId) {
            return res.redirect("/auth/login"); // ✅ Redirect if not logged in
        }

        // Fetch past posts by this user
        const userPosts = await Post.find({ user_id: userId }).populate("player_id");

        // Fetch all players
        const players = await Player.find();

        res.render("dashboard", { userPosts, players }); // Render the dashboard view
    } catch (err) {
        res.status(500).send("Error loading dashboard");
    }
};



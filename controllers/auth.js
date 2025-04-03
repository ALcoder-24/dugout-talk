import express from "express";
import bcrypt from "bcrypt";
import user from "../models/User.js";

const router = express.Router();

//signup Route
router.post("/signup", async (req, res) => {
try {
    const { username, email, password} = req.body;
    const newUser = new User({ username, email, password});
    await newUser.save();
    res.redirect("/login");
} catch (error) {
    res.status(500).send("Error signing up");
}
});

//Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });    

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send("Invalid credential");
    }

    req.session.userId = user._id; // Store user ID in session
    res.redirect("/dashboard");
});

//Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
     res.redirect("/login");   
    });
});

export default router;



import express from "express";
import { login, getLogin, register, getRegister, logout } from "../controllers/userController.js"; // Make sure to import getRegister and register

const router = express.Router();

// Route to display the login form
router.get("/login", getLogin);

// Route to handle login
router.post("/login", login);

// Route to display the register form
router.get("/register", getRegister);

// Route to handle registration
router.post("/register", register);  // Add this route for registration

router.get("/logout", logout);

export default router;

import express from "express";
import {
  login,
  getLogin,
  register,
  getRegister,
  logout,
} from "../controllers/userController.js"; 
const router = express.Router();

router.get("/login", getLogin);

router.post("/login", login);

router.get("/register", getRegister);

router.post("/register", register); 

router.get("/logout", logout);

export default router;

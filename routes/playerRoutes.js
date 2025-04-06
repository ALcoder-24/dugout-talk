// routes/playerRoutes.js
import express from "express";
import Player from "../models/Player.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const players = await Player.find();
    console.log("✔️ /players route hit — players loaded:", players.length);
    res.render("playerList", { players });
  } catch (err) {
    res.status(500).send("Error loading players");
  }
});

export default router;

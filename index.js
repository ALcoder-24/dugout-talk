import express from "express";
import db from "./db/connection.js";
import dotenv from "dotenv";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { isAuthenticated } from "./Middleware/isAuthenticated.js";
import { getDashboard } from "./controllers/userController.js";
import playerRoutes from "./routes/playerRoutes.js";
import Player from "./models/Player.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public")); 

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/auth", userRoutes); 
app.use("/posts", isAuthenticated, postRoutes); 

app.get("/dashboard", isAuthenticated, getDashboard);
app.use("/players", playerRoutes);

app.get("/guest", (req, res) => {
  Player.find()
    .then((players) => {
      res.render("guest", { players });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching players.");
    });
});

const PORT = process.env.PORT || 3000;

db.on("connected", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

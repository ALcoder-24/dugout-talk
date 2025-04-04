import express from "express";
import db from "./db/connection.js";
import dotenv from "dotenv";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js"; // Correct path
import postRoutes from "./routes/postRoutes.js"; // Correct path
import { isAuthenticated } from "./Middleware/isAuthenticated.js"; // Correct path to middleware
import { getDashboard } from "./controllers/userController.js";

// Initialize dotenv
dotenv.config();

// Initialize app
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public")); // Serve static files from 'public' folder

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret for encrypting session data
    resave: false,
    saveUninitialized: true,
  })
);

// Home route
app.get("/", (req, res) => {
  res.render("home");
});

// Routes
app.use("/auth", userRoutes); // Authentication routes
app.use("/posts", isAuthenticated, postRoutes); // Post routes with authentication required

// Add this route for dashboard
app.get("/dashboard", isAuthenticated, getDashboard);

// Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });

// Start Server
const PORT = process.env.PORT || 3000;

db.on("connected", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

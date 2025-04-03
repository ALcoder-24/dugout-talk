import express from "express"
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));

app.use(
    session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI })
    })
);

app.use(authRoutes);

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Database Connection Error:", err));

app.listen(3000, () => console.log("Server running on port 3000"));
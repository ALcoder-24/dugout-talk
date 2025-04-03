import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Player from "./models/Player.js";
import Post from "./models/Post.js";
import bcrypt from "bcrypt";

dotenv.config();


const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,  
        });
        console.log("Connected to MongoDB");
        
        await User.deleteMany({});
        await Player.deleteMany({});
        await Post.deleteMany({});
        console.log("Database cleared");

        const hashedPassword = await bcrypt.hash("password123", 10);
        const user1 = await User.create({
            username: "baseballFan99",
            email: "fan99@example.com",
            password: hashedPassword,
        });
        const user2 = await User.create({
            username: "mlbExpert",
            email: "expert@example.com",
            password: hashedPassword,
        });
        console.log("Users seeded");

        const player1 = await Player.create({
            name: "Pedro Martinez",
            era: "Hall of Fame",
            team: "Multiple",
        });
        const player2 = await Player.create({
            name: "Derek Jeter",
            era: "Hall of Fame",
            team: "Yankees",
        });
        console.log("Players seeded");

        await Post.create({
            user: user1._id,
            player_id: player1._id,
            content: "Greatest pitcher of all time!",
            created_at: new Date(),
         });

         await Post.create({
            user: user2._id,
            player_id: player2._id,
            content: "Stud!",
            created_at: new Date(),
         });

         console.log("Posts seeded");

         mongoose.connection.close();
         console.log("Database seeding complete. Connection closed.");
        } catch (error) {
            console.error("Error seeding database", error);
            mongoose.connection.close();
    }
};


seedDatabase();
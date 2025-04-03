import mongoose from "mongoose";
import bcrypt from "bcrypt";


//username: A required and unique string (no two users can have the same username).
//email: Also required and unique (ensures no duplicate emails).
//password: A required string (which will be hashed before storing).


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash password before saving
//It runs before saving a user (pre("save")).
//If the password hasn’t changed (!this.isModified("password")), it skips hashing.
//If it’s a new password or updated password, it hashes it using bcrypt.hash(this.password, 10).
//The 10 is the salt rounds, which makes the hash more secure.
//It then calls next() to move forward with saving the user.

userSchema.pre("save", async function (next) {
if (!this.isModified("password")) return next ();
this.password = await bcrypt.hash(this.password, 10);
next();
});


//Creates a User model based on the schema.
//This model allows us to create, read, update, and delete users in MongoDB.
//Makes the User model available for import in other files
const User = mongoose.model("User", userSchema);
export default User;
import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    era: { type: String, required: true },
    team: { type: String, required: true }, 
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
import dotenv from "dotenv";

dotenv.config();

export const secret = process.env.JWT_SECRET || "SECRET_KEY_RANDOM";

// console.log("Config file loaded");
// console.log("Loaded SECRET_KEY:", secret);

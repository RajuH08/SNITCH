import mongoose from "mongoose";
import { CONFIG } from "./config.js";



const connectDB = async () => {
  await mongoose.connect(CONFIG.MONGODB_URI);
  console.log("MongoDB connected successfully");
};


export default connectDB;
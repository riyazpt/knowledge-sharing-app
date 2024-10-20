import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connecteed");
  } catch (error) {
    console.log("Database connecteion Error" + error);
  }
};

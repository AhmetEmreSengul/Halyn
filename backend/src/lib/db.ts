import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
  try {
    if (ENV.MONGODB_URI === undefined) {
      throw new Error("MONGODB_URI is not defined");
    }
    const conn = await mongoose.connect(ENV.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

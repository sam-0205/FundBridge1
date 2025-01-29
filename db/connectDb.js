import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect("mongodb://localhost:27017/chai");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

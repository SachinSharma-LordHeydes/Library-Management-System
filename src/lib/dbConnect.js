// Check the implementation of your dbConnect function
// It should look something like this:
import mongoose from 'mongoose';

export default async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ MongoDB connection error:", error.message);
    } else {
      console.error("❌ Unknown error while connecting to MongoDB:", error);
    }
    process.exit(1);
  }
};

import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    throw error;
  }
};

export default db;
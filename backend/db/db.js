import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    throw error;
  }
};

export default db;
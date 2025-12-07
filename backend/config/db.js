import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB conectado...");
  } catch (error) {
    console.error("🔴 Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;

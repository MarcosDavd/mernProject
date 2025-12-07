import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/User.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// conectar a Mongo
connectDB();

app.get("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: "davox",
      email: "davox@example.com",
      password: "123456"
    });

    res.json({
      message: "Usuario creado con éxito",
      user: newUser
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

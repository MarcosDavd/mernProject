import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const nuevo = await User.create({
    nombre: "davo",
    email: "davo@example.com"
  });

  res.json(nuevo);
});

export default router;

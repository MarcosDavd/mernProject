import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/User.js";
import userRoute from "./routes/user.routes.js";
import { sanitizeInputs } from "./middleware/sanitize.js";

const app = express();
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}
));
// conectar a Mongo
connectDB();


// me ayuda parsear los datos enviados desde el cliente a formto json
// se ejcuta antes de cualquier peticion
app.use(express.json());
app.use(sanitizeInputs);

// aca se declara la ruta pricipal para los endpints de usuarios
// es decir declrar localhst:5000/user 
app.use('/user',userRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

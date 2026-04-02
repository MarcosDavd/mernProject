import express from 'express';
import { loginUser,registerUser, verification } from '../controllers/userController.js';


const router = express.Router();
// al llamar a registerUser se ejecuita  la funcion del contrller para registrar un usuario
router.post('/register',registerUser)
router.post('/verify',verification)
router.post('/login',loginUser)
export default router; 
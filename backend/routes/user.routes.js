import express from 'express';
import { registerUser, verification } from '../controllers/userController.js';

const router = express.Router();
// al llamar a registerUser se ejecuita  la funcion del contrller para registrar un usuario
router.post('/register',registerUser)
router.post('/verify',verification)
export default router; 
import express from 'express';
import { forgotPassword, loginUser,logoutUser,registerUser, verification,verifyOTP } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';


const router = express.Router();
// al llamar a registerUser se ejecuita  la funcion del contrller para registrar un usuario
router.post('/register',registerUser)
router.post('/verify',verification)
router.post('/login',loginUser)
// antes de cerrar sesion verifico que el usuario este autenticado
//  es decir que tenga un token valido para poder cerrar sesion
router.post('/logout',isAuthenticated, logoutUser)
router.post('/forgot-password',forgotPassword);
router.post('/verify-otp/:email',verifyOTP);
export default router; 
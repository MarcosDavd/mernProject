import express from 'express';
import {protect}   from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/perfil', protect,(req,res)=>{
    res.json({message: 'Perfil de usuario', user: req.user});
});
export default router;
import { verifyMail } from "../emailVerify/verifyMail.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    try {
        // destructuring assignment
     //js va a busar en el body del request los campos username, email y password y los asigna debidamente
        const {username,email,password} = req.body
        if(!username || !email || !password){
            console.log("campos username,email o password incompletos ");
            return res.status(400).json({
                sucess:false,
                message : "Campos incompletos"})    
        }
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                sucess:false,
                message : "Este usuario ya existe",
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })
        const token = jwt.sign({id:newUser},process.env.SECRET_KEY,{expiresIn:"10m"});
        verifyMail(token,email)
        newUser.token=token;
        await newUser.save();
        return res.status(201).json({sucess:true, message:"Se ha registrado el usuario correctamente",data:newUser}); 
    } catch (error) {
        console.log("Error al registrar el usuario", error);
        return res.status(500).json({
            sucess:false,
            message : "Error en el servidor"
        })
    }
}
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

export const verification = async (req,res) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                succes:false,
                message:"Authorization token is missing or invalid"
            })
        }
        const token = authHeader.split(" ")[1];
        let decoded;
        try{
            decoded = jwt.verify(token, process.env.SECRET_KEY)
        }catch(err){
            if(err.name === "TokenExpiredError"  ){
                return res.status(400).json({
                    success:false,
                    message:"Registration Token has expired"
                })
            }
            return res.status(400).json({
                success:false,
                message:"Token verification failed"
            })

        }
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        user.token = null;
        user.isVerified = true;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"User verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
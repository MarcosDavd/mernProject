import { verifyMail } from "../emailVerify/verifyMail.js";
import { sendOtpMail } from "../emailVerify/sendOtpMail.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Session from "../models/sessionModel.js";
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
export const loginUser = async (req,res)=>{
    try {
        // verifico que se ingresa email y password
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        // Verifico que el user este en el sistema
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized acces"
            })
        }
        // comom ya llegue aca significa que el usuario existe entonces
        // verifico su password
        const passwordCheck = await bcrypt.compare(password,user.password)
        if(!passwordCheck){
            return res.status(401).json({
                success:false,
                message:"Contraseña incorrecta"
            })
        }
        //check de usuario verificadp
        if(user.isVerified === false){
            return res.status(403).json({
                success:false,
                message:"Please verify your email to login"
            })
        }
        // check para session activa(si esta logueado en cualquier dispositivo) 
        // Si existe una session activa, la elimino para que el usuario pueda iniciar sesion en un nuevo dispositivo
        // Evito que el usuario tenga varias sesiones abiertas al mismo tiempo

        const existingSession = await Session.findOne({userId:user._id});
        if(existingSession){
            await Session.deleteOne({userId:user._id});
        }
        // Creo una nueva session para el usuario
        await Session.create({userId:user._id})
        
        // genero un tokens
        const accesToken = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"10d"})
        const refreshToken = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"30d"})
        
        user.isLoggedIn = true;
        await user.save();
        return res.status(200).json({
            success:true,
            message:`Welcome back ${user.username}`,
            accesToken,
            refreshToken,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}
export const logoutUser = async (req, res)=>{
    try {
        const userId = req.userId;
        await Session.deleteMany({userId});
        await User.findByIdAndUpdate(userId,{isLoggedIn:false})
        return res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
         
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const forgotPassword = async (req, res)=>{
    try {
        const {email}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save();
        await sendOtpMail(email, otp);
        return res.status(200).json({
            sucess:true,
            message:"OTP sent to email"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export const verifyOTP = async (req,res)=>{
    const {otp} = req.body;
    const email = req.params.email;
    if(!otp){
        return res.status(400).json({
            success:false,
            message:"OTP is required"
        })
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                success:false,
                message:"OTP not generated or already verified"
            })
        }
        if(user.otpExpiry < new Date()){
            return res.status(400).json({
                success:false,
                message:"OTP has expired. Please request a new OTP"
            })
        }
        if(otp !== user.otp){
            return res.status(400).json({
                    success:false,
                    message:"Invalid OTP. Please check the OTP and try again"
            })
        }
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"OTP verified successfully. You can now reset your password"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
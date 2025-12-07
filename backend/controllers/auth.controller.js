import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generarToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: "30d",
    });
};
export const registrar = async(req, res) => {
    const {name, email, password} = req.body;
    try{
        const existeUsuario = await User.findOne({email});
        if (existeUsuario){
            return res.status(400).json({msg: "El usuario ya existe"});
        }
        //el email es valido
        const usuario = await User.create({
            name,
            email,
            password,
        });
        res.json(
            {
                _id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                token: generarToken(usuario._id),
            }
        );
    } catch (error){
        res.status(400).json({error:error.message});
    }
};
export const login = async(req, res) => {
    const {email, password} = req.body;
    try{
        //busco el user por email
        const usuario = await User.findOne({email});
        if (!usuario){
            return res.status(400).json({msg: "Usuario no existe"});
        }
        //comparar contraseñas
        const passCorrecta = await usuario.matchPassword(password);
        if (!passCorrecta){
            return res.status(400).json({msg: "Contraseña incorrecta"});
        }
        res.json(
            {
                _id: usuario._id,
                name: usuario.name,
                email: usuario.email,
                token: generarToken(usuario._id),
            }
        );
    } catch (error){
        res.status(400).json({error:error.message});
    }
};
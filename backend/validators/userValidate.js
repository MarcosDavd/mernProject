import yup, { Schema } from "yup";

export const userSchema = yup.object({
    username:yup
    .string()
    .trim()
    .min(3,'User must be atleast 3  characters')
    .required(),
    email:yup
    .string()
    .email('The email is not valid one'),
    password:yup
    .string()
    .min(4,'Password must be atleast 4 characters')
    .required()
});

export const validateUser = (schema) => async(req,res,next) =>{
    try {
        await schema.validate(req.body);//Si los datos cumplen el schema → la promesa se resuelve y sigue el flujo
        next();
    } catch (err) {
        return res.status(400).json({
            errors:err.errors
        })
    }
}
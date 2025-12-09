import 'dotenv/config';
import nodemailer from 'nodemailer';   
export const verifyMail = async (token,email) => {
    
    const transporter = nodemailer.createTransport({
    service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })
    const mailConfigurations={
        from:process.env.MAIL_USER,
        to:email,
        subject:"Correo de verificacion",
        html:`<h1>Por favor, haga clic en el siguiente enlace para verificar su correo electrónico:</h1>`
    }
    transporter.sendMail(mailConfigurations,function (error,info){
        if (error){
            throw new Error(error);
        }
        console.log("Email enviado exitosamente: " + info);
    })
}
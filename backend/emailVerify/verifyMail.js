import 'dotenv/config';
import nodemailer from 'nodemailer';   
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
export const verifyMail = async (token,email) => {
    
    const emaliTemplateSource = fs.readFileSync(
        path.join(__dirname,"template.hbs"),"utf8"
    )
    const template = handlebars.compile(emaliTemplateSource);
    const htmlToSend = template({token:encodeURIComponent(token)});
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
        html:htmlToSend
    }
    transporter.sendMail(mailConfigurations,function (error,info){
        if (error){
            throw new Error(error);
        }
        console.log("Email enviado exitosamente: " + info);
    })
}
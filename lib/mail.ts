// Usar nodemailer para enviar emails
import nodemailer from 'nodemailer';

// Crear una cuenta de prueba o reemplazar con credenciales reales
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export async function sendEmail(to: string, subject: string, text: string) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });
    } catch (error) {
        console.error(error);
    }
}


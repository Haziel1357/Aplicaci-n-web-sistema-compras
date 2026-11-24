import transporter from "../config/email.js";

const enviarCorreo = async (destinatario, enlace) => {
  await transporter.sendMail({
    from: `"SmartVET" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: "Confirma tu cuenta de SmartVET",
    text: `Bienvenido a SmartVET.

Para confirmar tu cuenta, abre el siguiente enlace:

${enlace}

El enlace vence en 30 minutos.

Si no solicitaste esta cuenta, ignora este mensaje.`
  });
};

export default enviarCorreo;

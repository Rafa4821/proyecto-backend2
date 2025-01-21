import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verificación de Cuenta",
    html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
           <a href="${process.env.BASE_URL}/verify/${token}">${process.env.BASE_URL}/verify/${token}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reseteo de Contraseña",
    html: `<p>Haz clic en el siguiente enlace para resetear tu contraseña:</p>
           <a href="${process.env.BASE_URL}/reset-password/${token}">${process.env.BASE_URL}/reset-password/${token}</a>`,
  };

  await transporter.sendMail(mailOptions);
};

//No lo puedo hacer en un frontEnd

import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, code: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true para usar TLS; false para usar SSL/TLS
      auth: {
        user: 'daphnee.reichel@ethereal.email',
        pass: 'uPnVwMEmRZWBF9aQMf',
      },
    });

    const mailOptions = {
      from: 'matter@example.com',
      to: email,
      subject: 'Código de verificación',
      text: `Tu código de verificación es: ${code}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
};

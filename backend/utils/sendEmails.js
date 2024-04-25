import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const pass = process.env.SMTP_PASS;

const sendEmail = async (options) => {
  try {
    const transporter = createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "varunsannapureddy@gmail.com",
        password: pass,
      },
    });

    const mailOptions = {
      from: "noreply@flowblog.com",
      to: options.to,
      subject: options.subject,
      html: options.message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error in sendEmail:", error);
  }
};

export default sendEmail;

// export const sendVerificationCode = async (toEmail, verificationCode) => {
//     await transporter.sendMail({
//       from: "noreply@flowblog.com",
//       to: toEmail,
//       subject: "Your OTP NUMBER ",
//       html: `<p>This is Your OTP. IT WILL EXPIRE IN 10 MINUTES : <strong>${OTP} </strong> </p>`,
//     });

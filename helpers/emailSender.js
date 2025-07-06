import nodemailer from "nodemailer";
import {} from "dotenv/config"; // For .env variables to work

const { MAIL_USERNAME, MAIL_HOST, MAIL_PORT, MAIL_PASSWORD } = process.env;

const config = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const emailSender = async (data) => {
  return new Promise((resolve, reject) => { 
    try { 
      const email = { ...data, from: `Konstantin Kolomiichuk ${MAIL_USERNAME}` };
      const result = transporter.sendMail(email);
      resolve(result);
    }
    catch (error) { 
      reject(error);
    }
  });
};

export default emailSender
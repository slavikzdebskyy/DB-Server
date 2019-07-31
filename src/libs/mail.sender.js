import smtpTransport from 'nodemailer-smtp-transport'; 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const mailSender = nodemailer.createTransport(smtpTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  tls: {
      rejectUnauthorized: false
  },
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PSWRD,
  }
}));

export const mailOptionsRestore = (to, code) => {
  return {
    from: process.env.MAIL_USER, 
    to: `${to}`,
    subject: 'Restore Password',
    html: `
      <h1>Restore password</h1>
      <h5>Your code to restore password: <h4> ${code}</h4></h5>
      `
  }
};

export const mailOptionsChanged = (to) => {
  return {
    from: process.env.MAIL_USER, 
    to: `${to}`,
    subject: 'Password successfully changed',
    html: `
      <h1>New Password !!!</h1>
      <h5>Your password successfully changed</h5>
      `
  }
};
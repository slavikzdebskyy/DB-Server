import smtpTransport from 'nodemailer-smtp-transport'; 
import nodemailer from 'nodemailer';
import config from 'config';

const mailConfig = config.get('mailSender');

export const mailSender = nodemailer.createTransport(smtpTransport({
  host: mailConfig.MAIL_HOST,
  port: mailConfig.MAIL_PORT,
  secure: true,
  tls: {
      rejectUnauthorized: false
  },
  auth: {
    user: mailConfig.MAIL_USER,
    pass: mailConfig.MAIL_PSWRD,
  }
}));

export const mailOptionsRestore = (to, code) => {
  return {
    from: mailConfig.MAIL_USER, 
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
    from: mailConfig.MAIL_USER, 
    to: `${to}`,
    subject: 'Password successfully changed',
    html: `
      <h1>New Password !!!</h1>
      <h5>Your password successfully changed</h5>
      `
  }
};

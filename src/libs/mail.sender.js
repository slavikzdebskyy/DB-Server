
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport'; 


export const mailSender = nodemailer.createTransport(smtpTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  tls: {
      rejectUnauthorized: false
  },
  auth: {
    user: 'zd_mouse@ukr.net',
    pass: 'qwerty!123'
  }
}));

export const mailOptionsRestore = (to, code) => {
  return {
    from: 'zd_mouse@ukr.net', 
    to: `${to}`,
    subject: 'Restore Password',
    html: `
      <h1>Restore password</h1>
      <h5>Your code to restore password: ${code}</h5>
      `
  }
};

export const mailOptionsChanged = (to) => {
  return {
    from: 'zd_mouse@ukr.net', 
    to: `${to}`,
    subject: 'Password successfully changed',
    html: `
      <h1>New Password !!!</h1>
      <h5>Your password successfully changed</h5>
      `
  }
};
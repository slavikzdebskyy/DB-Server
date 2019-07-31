
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
    // user: 'zd_mouse@ukr.net',
    user: 'polyakpro@ukr.net',
    pass: 'lxtdt177',
    // pass: 'qwerty!123'
  }
}));

export const mailOptionsRestore = (to, code) => {
  return {
    from: 'polyakpro@ukr.net', 
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
    from: 'polyakpro@ukr.net', 
    to: `${to}`,
    subject: 'Password successfully changed',
    html: `
      <h1>New Password !!!</h1>
      <h5>Your password successfully changed</h5>
      `
  }
};
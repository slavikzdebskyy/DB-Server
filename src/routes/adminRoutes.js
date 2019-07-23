import express from 'express';
import Admin from '../mongo/admin.model'
import { ROUTES, MESSAGES } from '../constans';
import bcrypt from 'bcrypt';
import { generateJwt } from '../libs/jwt-heleper';
import nodemailer from 'nodemailer';



const adminRoutes = express.Router();

adminRoutes.post(ROUTES.ADMIN.login, (request, response) => {
  Admin.findOne({ email: request.body.email })
    .then(data => {
      bcrypt.compare(request.body.password, data.password)
        .then(isPasswordsEqual => {
          if (isPasswordsEqual) {
            const token = generateJwt({ admin: data.email });
            data.save()
              .then((adminData) => {
                const admin = {
                  lastName: adminData.lastName,
                  firstName: adminData.firstName,
                  permission: adminData.permission,
                  nickName: adminData.nickName,
                  email: adminData.email,
                  avatar: adminData.avatar,
                };
                response.status(200).json({status: true, token, admin});
            })
              .catch(() => response.status(401).json({ status: false, message: MESSAGES.cant_login }));
          }  else {
            response.status(401).json({ status: isPasswordsEqual, message: MESSAGES.wrong_pswrd });
          }    
        })
      .catch((err) => response.status(401).json({ status: err, message: MESSAGES.wrong_pswrd }));
    })
    .catch(() => response.status(401).json({ status: false, message: MESSAGES.admin_not_registered }));  
});

adminRoutes.post(ROUTES.ADMIN.restorePswrd, (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'zd_mouse@ukr.net',
      pass: ''
    }
  });
  
  const mailOptions = {
    from: 'zd_mouse@ukr.net',
    to: 'zdebskyy.slavik@gmail.com',
    subject: 'Sending Email using Node.js',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(400).json({error});
    } else {
      res.status(400).json({info});
    }
  });

  // async function main(){

  //   // Generate test SMTP service account from ethereal.email
  //   // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();
  
  //   // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.ukr.net",
  //     port: 465,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: 'zd_mouse@ukr.net',
  //       pass: 'monster25pilot'
  //     }
  //   });
  
  //   // send mail with defined transport object
  //   let info = await transporter.sendMail({
  //     from: '"Fred Foo 👻" <zd_mouse@ukr.net>', // sender address
  //     to: "zdebskyy.slavik@gmail.com", // list of receivers
  //     subject: "Hello ✔", // Subject line
  //     text: "Hello world?", // plain text body
  //     html: "<b>Hello world?</b>" // html body
  //   });
  
  //   console.log("Message sent: %s", info.messageId);
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
  //   // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  // }
  
  // main().catch(console.error);
  
 
  // Admin.findOne({ email: req.body.email })
  //   .then(data => {
  //     data.tokens = data.tokens.filter(token => token !== req.headers.authorization);
  //     data.save()
  //       .then(() => res.status(200).json({ status: true }))
  //   })
  //   .catch(() => res.status(404).json({ status: false, message: MESSAGES.cant_logout }))
});

export default adminRoutes;

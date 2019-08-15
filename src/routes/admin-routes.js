import randomstring from 'randomstring';
import express from 'express';
import bcrypt from 'bcrypt';

import { mailSender, mailOptionsRestore, mailOptionsChanged } from '../libs/mail.sender';
import { ROUTES, MESSAGES, SECURITY_CODE_LENGTH, saltRounds } from '../constants';
import { generateJwt } from '../libs/jwt-heleper';
import Admin from '../mongo/admin.model';


const adminRoutes = express.Router();

adminRoutes.post(ROUTES.ADMIN.login, (request, response) => {
  Admin.findOne({ email: request.body.email })
    .then(admin => {
      bcrypt.compare(request.body.password, admin.password)
        .then(isPasswordsEqual => {
          if (isPasswordsEqual) {
            const token = generateJwt({ admin: admin.email });
            const data = {
              lastName: admin.lastName,
              firstName: admin.firstName,
              permission: admin.permission,
              nickName: admin.nickName,
              email: admin.email,
              avatar: admin.avatar,
            };
            response.status(200).json({status: isPasswordsEqual, token, data});
          }  else {
            response.status(401).json({ status: isPasswordsEqual, message: MESSAGES.wrong_pswrd });
          }    
        })
      .catch(error => response.status(401).json({ status: false, error, message: MESSAGES.cant_login }));
    })
    .catch((error) => response.status(401).json({ status: false, error, message: MESSAGES.admin_not_registered }));  
});

adminRoutes.post(ROUTES.ADMIN.restorePswrd, (request, response) => {
  Admin.findOne({ email: request.body.email })
    .then(admin => { 
      if (admin) {
        const code = randomstring.generate(SECURITY_CODE_LENGTH);
        admin.securityCode = code;   
        admin.save()
          .then(newAdmin =>  mailSender.sendMail(mailOptionsRestore(newAdmin.email, code), (error, info) => {
            if (error) {
              response.status(409).json({status: false, error});
            } else {
              response.status(200).json({status: true, message: MESSAGES.code_success});
            }
          }))
          .catch(error => response.status(409).json({status: false, error, message: MESSAGES.db_error}));
      } else {
        response.status(404).json({status: false, message: MESSAGES.admin_not_registered});
      }      
    })
    .catch(error => response.status(409).json({status: false, error, message: MESSAGES.db_error}));   
});


adminRoutes.post(ROUTES.ADMIN.checkCode, (request, response) => {
  Admin.findOne({ email: request.body.email })
    .then(admin => {
      if (admin.securityCode && admin.securityCode === request.body.code) {
        admin.securityCode = null;   
        admin.save()
        response.status(200).json({status: true, message: MESSAGES.success});
      } else {
        admin.securityCode = null;   
        admin.save()
        response.status(403).json({status: false, message: MESSAGES.wrong_code});

      }
    })
    .catch(error => response.status(409).json({status: false, error, message: MESSAGES.db_error})); 
});


adminRoutes.patch(ROUTES.ADMIN.changePassword, (request, response) => {
  if (!request.body.password
    || !request.body.passwordConfirm 
    || request.body.password !== request.body.passwordConfirm) {
      response.status(403).json({status: true, message: MESSAGES.pswrdsNotEqual});
    };
  Admin.findOne({ email: request.body.email })
    .then(admin => {
      return bcrypt.hash(request.body.password, saltRounds)
        .then(hash => {
          admin.password = hash;
          admin.save()
          .then(newAdmin =>  mailSender.sendMail(mailOptionsChanged(newAdmin.email), (error, info) => {
            if (error) {
              response.status(409).json({status: false, error});
            } else {
              response.status(200).json({status: true, message: MESSAGES.pswrdChanged});
            };
          }))
        })     
    })
    .catch(error => response.status(409).json({status: false, error, message: MESSAGES.db_error})); 
});

export default adminRoutes;

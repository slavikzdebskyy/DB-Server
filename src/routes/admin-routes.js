import express from 'express';
import Admin from '../mongo/admin.model';
import { ROUTES, MESSAGES, SECURITY_CODE_LENGTH, saltRounds } from '../constants';
import bcrypt from 'bcrypt';
import { generateJwt } from '../libs/jwt-heleper';
import { mailSender, mailOptionsRestore, mailOptionsChanged } from '../libs/mail.sender';
import randomstring from 'randomstring';

const adminRoutes = express.Router();

adminRoutes.post(ROUTES.ADMIN.login, (request, response) => {
  Admin.findOne({ email: request.body.email })
    .then(data => {
      bcrypt.compare(request.body.password, data.password)
        .then(isPasswordsEqual => {
          if (isPasswordsEqual) {
            const token = generateJwt({ admin: data.email });
            const admin = {
              lastName: data.lastName,
              firstName: data.firstName,
              permission: data.permission,
              nickName: data.nickName,
              email: data.email,
              avatar: data.avatar,
            };
            response.status(200).json({status: isPasswordsEqual, token, admin});
          }  else {
            response.status(401).json({ status: isPasswordsEqual, message: MESSAGES.wrong_pswrd });
          }    
        })
      .catch(err => response.status(401).json({ status: err, message: MESSAGES.wrong_pswrd }));
    })
    .catch(() => response.status(401).json({ status: false, message: MESSAGES.admin_not_registered }));  
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
              response.status(200).json({status: true, msg: MESSAGES.code_success});
            }
          }))
          .catch(error => response.status(409).json({status: false, error, msg: MESSAGES.db_error}));
      } else {
        response.status(404).json({status: false, msg: MESSAGES.admin_not_registered});
      }      
    })
    .catch(error => response.status(409).json({error, msg: MESSAGES.db_error}));   
});


adminRoutes.post(ROUTES.ADMIN.checkCode, (request, response) => {
  Admin.findOne({ email: request.body.email })
    .then(admin => {
      if (admin.securityCode && admin.securityCode === request.body.code) {
        admin.securityCode = null;   
        admin.save()
        response.status(200).json({status: true, msg: MESSAGES.success});
      } else {
        admin.securityCode = null;   
        admin.save()
        response.status(403).json({status: false, msg: MESSAGES.wrong_code});

      }
    })
    .catch(error => response.status(409).json({status: false, error, msg: MESSAGES.db_error})); 
});


adminRoutes.patch(ROUTES.ADMIN.changePassword, (request, response) => {
  if (!request.body.password
    || !request.body.passwordConfirm 
    || request.body.password !== request.body.passwordConfirm) {
      response.status(403).json({status: true, msg: MESSAGES.pswrdsNotEqual});
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
              response.status(200).json({status: true, msg: MESSAGES.pswrdChanged});
            };
          }))
        })     
    })
    .catch(error => response.status(409).json({status: false, error, msg: MESSAGES.db_error})); 
});

export default adminRoutes;

import express from 'express';
import Admin from '../mongo/admin.model'
import { ROUTES, MESSAGES, JWT_SECRET } from '../constans';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminRoutes = express.Router();

adminRoutes.post(ROUTES.ADMIN.login, (request, response) => {
  Admin.findOne({ email: request.body.email })
    .then(data => {
      bcrypt.compare(request.body.password, data.password)
        .then(isPasswordsEqual => {
          if (isPasswordsEqual) {
            const token = jwt.sign({ admin: data.email, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, JWT_SECRET);  
            const tokensNotExp = data.tokens.map(el => {
              const bar = jwt.verify(el, JWT_SECRET);
              if (bar.exp > bar.iat) {
                return el;
              }
            });          
            data.tokens = [...tokensNotExp, token];
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
          } else {
            response.status(401).json({ status: result, message: MESSAGES.wrong_pswrd });
          }          
        }
      );
    })
    .catch(() => response.status(401).json({ status: false, message: MESSAGES.admin_not_registered }));  
});

adminRoutes.post(ROUTES.ADMIN.logout, (req, res) => {
  Admin.findOne({ email: req.body.email })
    .then(data => {
      data.tokens = data.tokens.filter(token => token !== req.headers.authorization);
      data.save()
        .then(() => res.status(200).json({ status: true }))
    })
    .catch(() => res.status(404).json({ status: false, message: MESSAGES.cant_logout }))
});

adminRoutes.get(ROUTES.test, (req,res) => {
  res.status(200).json({msg: 'Test done success'})
})

export default adminRoutes;
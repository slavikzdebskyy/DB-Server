import express from 'express';
import Admin from '../mongo/admin.model'
import { ROUTES, MESSAGES, JWT_SECRET } from '../constans';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminRoutes = express.Router();

adminRoutes.post(ROUTES.ADMIN.login, (req, res) => {
  Admin.findOne({email: req.body.email})
    .then( data => {
      bcrypt.compare(req.body.password, data.password)
        .then( result => {
          if (result) {
            const token = jwt.sign({ admin: data.email, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, JWT_SECRET);
            res.status(200).json({status: result, token});
          } else {
            res.status(401).json({ status: result, message: MESSAGES.wrong_pswrd });
          }          
        }
      );
    })
    .catch(() => {
    res.status(401).json({ status: false, message: MESSAGES.admin_not_registered });
	});  
})

export default adminRoutes;
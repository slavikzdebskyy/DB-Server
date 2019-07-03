import express from 'express';
import Admin from '../mongo/admin.model'
import { ROUTES, MESSAGES } from '../constans';
import bcrypt from 'bcrypt';

const adminRoutes = express.Router();

adminRoutes.post(ROUTES.ADMIN.login, (req, res) => {
  Admin.findOne({email: req.body.email})
    .then( data => {
      bcrypt.compare(req.body.password, data.password)
        .then( result => {
          if (result) {
            res.status(200).json({status: result});
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
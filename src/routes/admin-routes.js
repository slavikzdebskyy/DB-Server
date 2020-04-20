import randomstring from 'randomstring';
import express from 'express';
import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';

import { mailSender, mailOptionsRestore, mailOptionsChanged } from '../libs/mail.sender';
import { ROUTES, MESSAGES, SECURITY_CODE_LENGTH, saltRounds } from '../constants';
import { generateJwt } from '../libs/jwt-heleper';
import Admin from '../mongo/admin.model';

const adminRoutes = express.Router();

/**
 * @method: POST
 * @body: JSON
 * {
 *  email: string;
 *  password: string;
 *  }
 *  @Authefication:
 * */
adminRoutes.post(
  ROUTES.ADMIN.login,
  [
    check('email', MESSAGES.incorrect_email).isEmail(),
    check('password', MESSAGES.length_pwrd).isLength({ min: 6 })
  ],
  async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array(), message: MESSAGES.bad_request })
    }

    const admin = await Admin.findOne({ email: request.body.email });
    if (!admin) {
      return response.status(401).json({ status: false, message: MESSAGES.admin_not_registered });
    }

    const isPasswordsEqual =  await bcrypt.compare(request.body.password, admin.password);
    if (!isPasswordsEqual) {
      return response.status(401).json({ status: isPasswordsEqual, message: MESSAGES.wrong_pswrd });
    }

    const token = generateJwt({ admin: admin.email });
    const data = {
      lastName: admin.lastName,
      firstName: admin.firstName,
      permission: admin.permission,
      nickName: admin.nickName,
      email: admin.email,
      avatar: admin.avatar,
    };

    return response.status(200).json({status: isPasswordsEqual, token, data});
  }
  catch (error) {
    return response.status(500).json({ status: false, error, message: MESSAGES.server_error });
  }
});

/**
 * @method: POST
 * @body: JSON
 * { email: string; }
 *  @Authefication:
 * */
adminRoutes.post(
  ROUTES.ADMIN.restorePswrd,
  [
    check('email', MESSAGES.incorrect_email).isEmail()
  ],
  async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array(), message: MESSAGES.bad_request })
    }

    const admin = await Admin.findOne({ email: request.body.email });
    if (!admin) {
      return response.status(401).json({ status: false, message: MESSAGES.admin_not_registered });
    }

    const code = randomstring.generate(SECURITY_CODE_LENGTH);
    admin.securityCode = code;
    const newAdmin = await admin.save();
    if (!newAdmin) {
      return response.status(409).json({status: false, error, message: MESSAGES.db_error});
    }

    const info = await mailSender.sendMail(mailOptionsRestore(newAdmin.email, code));
    if (!info) {
      return response.status(409).json({status: false, error});
    }

    return response.status(200).json({status: true, message: MESSAGES.code_success});
  }
  catch (error) {
    return response.status(500).json({ status: false, error, message: MESSAGES.server_error });
  }
});

/**
 * @method: POST
 * @body: JSON
 * {
 *  email: string;
 *  code: string;
 *  }
 *  @Authefication:
 * */
adminRoutes.post(
  ROUTES.ADMIN.checkCode,
  [
    check('email', MESSAGES.incorrect_email).isEmail()
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array(), message: MESSAGES.bad_request })
      }

      const admin = await Admin.findOne({ email: request.body.email });
      if (!admin) {
        return response.status(401).json({ status: false, message: MESSAGES.admin_not_registered });
      }

      if (admin.securityCode && admin.securityCode === request.body.code) {
        admin.securityCode = null;
        await admin.save();

        return response.status(200).json({status: true, message: MESSAGES.success});
      } else {
        admin.securityCode = null;
        await admin.save();

        return response.status(403).json({status: false, message: MESSAGES.wrong_code});
      }
    }
    catch (error) {
      return response.status(500).json({ status: false, error, message: MESSAGES.server_error });
    }
});

/**
 * @method: PATCH
 * @body: JSON:
 * {
 *  email: string;
 *  password: string;
 *  passwordConfirm: string
 *  }
 *  @Authefication:
 * */
adminRoutes.patch(
  ROUTES.ADMIN.changePassword,
  [
    check('email', MESSAGES.incorrect_email).isEmail(),
    check('password', MESSAGES.length_pwrd).isLength({min: 6}),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty() || request.body.password !== request.body.passwordConfirm) {
        const err = errors.isEmpty() ? [] :  errors.array();
        return response.status(400).json({ errors: err, message: MESSAGES.bad_request })
      }

      const admin = await Admin.findOne({ email: request.body.email });
      if (!admin) {
        return response.status(401).json({ status: false, message: MESSAGES.admin_not_registered });
      }

      admin.password = await bcrypt.hash(request.body.password, saltRounds);
      const newAdmin = await admin.save();
      const info = await mailSender.sendMail(mailOptionsChanged(newAdmin.email));
      if (!info) {
        return response.status(409).json({status: false, error});
      }

      return response.status(200).json({status: true, message: MESSAGES.pswrdChanged});
    }
    catch (error) {
      return response.status(500).json({ status: false, error, message: MESSAGES.server_error });
    }
});

export default adminRoutes;

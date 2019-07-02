import mongoose from 'mongoose';
import express from 'express';
import Admin from '../mongo/admin.model'
import { ROUTES } from '../constans';

const adminRoutes = express.Router();

adminRoutes.post(ROUTES.ADMIN.login, (req, res) => {
  res.status(200).json({'status': true})
  console.log('test')
})










export default adminRoutes;
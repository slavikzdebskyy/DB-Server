import express from 'express';
import { ROUTES } from '../constants';
import { verifyJwt, getDecoded } from '../libs/jwt-heleper';


const testRoutes = express.Router();

testRoutes.get(ROUTES.test, (req,res) => {
  const token = req.headers.authorization;
  if (verifyJwt(token)) {
    const decoded = getDecoded(token);
    res.status(200).json({msg: 'Test done success', decoded})
  } else {
    res.status(401).json({msg: 'Test failed'})
  }
});


export default testRoutes;
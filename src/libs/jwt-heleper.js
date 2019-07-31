// import { JWT_SECRET } from '../constants';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyJwt = (token) => {
  let decoded = false;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    decoded = false;
  }
  return decoded;
}

export const generateJwt = (data) => {
  return jwt.sign({ data, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, process.env.JWT_SECRET);
}

export const getDecoded = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}
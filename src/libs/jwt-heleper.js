import { JWT_SECRET } from '../constans';
import jwt from 'jsonwebtoken';

export const verifyJwt = (token) => {
  let decoded = false;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    decoded = false;
  }
  return decoded;
}

export const generateJwt = (data) => {
  return jwt.sign({ data, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, JWT_SECRET);
}

export const getDecoded = (token) => {
  return jwt.verify(token, JWT_SECRET);
}
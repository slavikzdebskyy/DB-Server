import jwt from 'jsonwebtoken';
import config from 'config';

const jwtSecret = config.get('jwtSeecret');

export const verifyJwt = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch (e) {
    decoded = false;
  }
  return decoded;
};

export const generateJwt = (data) => {
  return jwt.sign({ data, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, process.env.JWT_SECRET);
};

export const getDecoded = (token) => {
  return jwt.verify(token, jwtSecret);
};

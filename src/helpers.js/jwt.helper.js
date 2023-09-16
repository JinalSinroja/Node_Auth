import 'dotenv/config';
import jwt from 'jsonwebtoken';
import apiResponse from './apiResponse.helper.js';
import { TOKEN_SECRET } from '../config/config.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return apiResponse(res, {
      code: 401,
      status: 400,
      message: 'Access token is missing in the request header.',
    });

  jwt.verify(token, TOKEN_SECRET || 'demoapp', (err, user) => {
    if (err)
      return apiResponse(res, {
        code: 403,
        status: 400,
        message: err.message,
      });

    req.user = user;

    next();
  });
};

const generateAccessToken = (...data) =>
  jwt.sign(...data, TOKEN_SECRET, { expiresIn: '8h' });

export { authenticateToken, generateAccessToken };

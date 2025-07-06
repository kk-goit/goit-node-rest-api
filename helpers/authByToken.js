import { authUserByToken } from '../controllers/usersControllers.js';
import HttpError from './HttpError.js';

const authByToken = async (req, _, next) => { 
  const  authHeader = req.headers.authorization;
  if (!authHeader) throw HttpError(401, 'Not authorized');

  const token = authHeader.split(' ')[1];
  if (!token) throw HttpError(401, 'Not authorized');

  const user = await authUserByToken(token);
  if (!user) throw HttpError(401, 'Not authorized');

  req.user = user;  
  next();
};

export default authByToken;
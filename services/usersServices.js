import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/models/users.js";
import getGravatarUrl from "../helpers/gravatarURL.js";

const { JWT_SECRET, JWT_EXPIRES } = process.env;

export const getUserByEmail = async (email) => { 
  return await User.findOne({
    where: {
      email,
    },
  });
};

export const createUser = async (body) => {
  const { email, password } = body;
  const hashpass = await bcrypt.hash(password, 10);

  let { avatarURL } = body
  if (!avatarURL) avatarURL = await getGravatarUrl(email);
  
  return User.create({ ...body, password: hashpass, avatarURL });
};

export const validatePassword = async (pass, hashpass) => { 
  return await bcrypt.compare(pass, hashpass);
};

export const generateToken = async (user) => { 
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

  await user.update({ token });
  return token;
};

export const getUserByToken = async (token) => { 
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findByPk(decoded.id);

  if (!user || user.token !== token)
    return false;

  return user;
};

export const clearUserToken = async (user) => { 
  await user.update({ token: null });
};

export const changeUserAvatar = async (user, avatarURL) => {
  await user.update({ avatarURL });
};

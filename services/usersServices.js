import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "../db/models/users.js";
import getGravatarUrl from "../helpers/gravatarURL.js";
import emailSender from "../helpers/emailSender.js";

const { JWT_SECRET, JWT_EXPIRES } = process.env;

export const getUserByEmail = async (email) => { 
  return await User.findOne({
    where: {
      email,
    },
  });
};

export const sendVerificationEmail = async (user, baseURL) => { 
  // const verifyToken = jwt.sign({ id: user.id }, JWT_SECRET, { subject: 'email verification' });
  const verifyToken = nanoid();
  await user.update({ verificationToken: verifyToken });

  await emailSender({ 
    to: user.email,
    subject: 'Please confirm your email address to complete the registration process.',
    html: `<a href="${baseURL}api/auth/verify/${verifyToken}" target="_blank">Verify email</a>`,
  });
};

export const createUser = async (body) => {
  const { email, password, baseURL } = body;
  const hashpass = await bcrypt.hash(password, 10);

  let { avatarURL } = body
  if (!avatarURL) avatarURL = await getGravatarUrl(email);
  
  const user = await User.create({ ...body, password: hashpass, avatarURL });
  if (user) await sendVerificationEmail(user, baseURL);

  return user;
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

export const verifyUserByEmail = async (verificationToken) => { 
  const user = await User.findOne({ where: { verificationToken } });
  if (!user) return false

  await user.update({ verify: true, verificationToken: null });
  return true;
};
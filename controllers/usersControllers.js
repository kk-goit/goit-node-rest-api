import fs from "node:fs/promises";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";
import {
  clearUserToken,
  createUser,
  generateToken,
  getUserByEmail,
  getUserByToken,
  validatePassword,
  changeUserAvatar,
} from "../services/usersServices.js";
 
const avatarsDir = path.resolve("public", "avatars");

export const registerUser = async (req, res) => { 
  const user = await getUserByEmail(req.body.email)
  if (user) throw HttpError(409, "Email in use");

  const new_user = await createUser(req.body);
  res.status(201).json({
    user: {
      email: new_user.email,
      subscription: new_user.subscription,
      avatarURL: new_user.avatarURL,
    },
  });
};

export const loginUser = async (req, res) => { 
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user || !await validatePassword(password, user.password))
    throw HttpError(401, 'Email or password is wrong');

  const token = await generateToken(user);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    }
  });
};

export const authUserByToken = async (token) => { 
  try {
    return await getUserByToken(token);
  }
  catch (error) {
    throw HttpError(401, "Not authorized");
  }
};

export const logoutUser = async (req, res) => { 
  await clearUserToken(req.user);

  res.status(204).send();
};

export const currentUser = async (req, res) => { 
  res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
    avatarURL: req.user.avatarURL,
  });
}

export const uploadUserAvatar = async (req, res) => { 
  let avatar = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(oldPath, newPath);
    avatar = `${req.protocol}://${req.get('host')}/${path.join("avatars", filename)}`;
  }
  const user = await changeUserAvatar(req.user, avatar);
  res.status(200).json({ avatarURL: req.user.avatarURL });
};

import HttpError from "../helpers/HttpError.js";
import {
  clearUserToken,
  createUser,
  generateToken,
  getUserByEmail,
  getUserByToken,
  validatePassword,
 } from "../services/usersServices.js";

export const registerUser = async (req, res) => { 
  const user = await getUserByEmail(req.body.email)
  if (user) throw HttpError(409, "Email in use");

  const new_user = await createUser(req.body);
  res.status(201).json({
    user: { email: new_user.email, subscription: new_user.subscription },
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
      email: user.email, subscription: user.subscription
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
  res.status(200).json({ email: req.user.email, subscription: req.user.subscription });
}
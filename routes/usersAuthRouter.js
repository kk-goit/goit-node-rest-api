import express from "express";
import validateBody from "../helpers/validateBody.js";
import errorCatcher from "../helpers/errorCatcher.js";
import authByToken from "../helpers/authByToken.js";
import fileUploader from "../helpers/fileUploader.js";
import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  uploadUserAvatar,
} from "../controllers/usersControllers.js";

const usersAuthRouter = express.Router();

usersAuthRouter.post("/register", validateBody(registerUserSchema), errorCatcher(registerUser));
usersAuthRouter.post("/login", validateBody(loginUserSchema), errorCatcher(loginUser));
usersAuthRouter.post("/logout", errorCatcher(authByToken), errorCatcher(logoutUser));
usersAuthRouter.get("/current", errorCatcher(authByToken), errorCatcher(currentUser));
usersAuthRouter.patch("/avatars", errorCatcher(authByToken), fileUploader.single("avatar"), errorCatcher(uploadUserAvatar));

export default usersAuthRouter;

import express from "express";
import validateBody from "../middleware/validateBody.js";
import errorCatcher from "../helpers/errorCatcher.js";
import authByToken from "../middleware/authByToken.js";
import fileUploader from "../middleware/fileUploader.js";
import { registerUserSchema, loginUserSchema, emailUserSchema } from "../schemas/usersSchemas.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  uploadUserAvatar,
  resendVerifyEmail,
  verifyUserEmail,
} from "../controllers/usersControllers.js";

const usersAuthRouter = express.Router();

usersAuthRouter.post("/register", validateBody(registerUserSchema), errorCatcher(registerUser));
usersAuthRouter.post("/verify", validateBody(emailUserSchema), errorCatcher(resendVerifyEmail));
usersAuthRouter.get("/verify/:verificationToken", errorCatcher(verifyUserEmail));

usersAuthRouter.post("/login", validateBody(loginUserSchema), errorCatcher(loginUser));
usersAuthRouter.post("/logout", errorCatcher(authByToken), errorCatcher(logoutUser));

usersAuthRouter.get("/current", errorCatcher(authByToken), errorCatcher(currentUser));
usersAuthRouter.patch("/avatars", errorCatcher(authByToken), fileUploader.single("avatar"), errorCatcher(uploadUserAvatar));

export default usersAuthRouter;

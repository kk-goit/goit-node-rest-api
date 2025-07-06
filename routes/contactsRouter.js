import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateParams from "../middleware/validateParams.js";
import validateBody from "../middleware/validateBody.js";
import errorCatcher from "../helpers/errorCatcher.js";
import authByToken from "../middleware/authByToken.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
  contactIdParamSchema
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", errorCatcher(authByToken), errorCatcher(getAllContacts));

contactsRouter.get("/:id", errorCatcher(authByToken), validateParams(contactIdParamSchema), errorCatcher(getOneContact));

contactsRouter.delete("/:id", errorCatcher(authByToken), validateParams(contactIdParamSchema), errorCatcher(deleteContact));

contactsRouter.post("/", errorCatcher(authByToken), validateBody(createContactSchema), errorCatcher(createContact));

contactsRouter.put("/:id", errorCatcher(authByToken), validateParams(contactIdParamSchema), validateBody(updateContactSchema), errorCatcher(updateContact));

contactsRouter.patch("/:id/favorite", errorCatcher(authByToken), validateParams(contactIdParamSchema), validateBody(updateStatusContactSchema), errorCatcher(updateContact));

export default contactsRouter;

import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateParams from "../helpers/validateParams.js";
import validateBody from "../helpers/validateBody.js";
import errorCatcher from "../helpers/errorCatcher.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
  contactIdParamSchema
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", errorCatcher(getAllContacts));

contactsRouter.get("/:id", validateParams(contactIdParamSchema), errorCatcher(getOneContact));

contactsRouter.delete("/:id", validateParams(contactIdParamSchema), errorCatcher(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), errorCatcher(createContact));

contactsRouter.put("/:id", validateParams(contactIdParamSchema), validateBody(updateContactSchema), errorCatcher(updateContact));

contactsRouter.patch("/:id/favorite", validateParams(contactIdParamSchema), validateBody(updateStatusContactSchema), errorCatcher(updateContact));

export default contactsRouter;

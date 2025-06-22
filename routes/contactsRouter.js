import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import errorCatcher from "../helpers/errorCatcher.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", errorCatcher(getAllContacts));

contactsRouter.get("/:id", errorCatcher(getOneContact));

contactsRouter.delete("/:id", errorCatcher(deleteContact));

contactsRouter.post("/", validateBody(createContactSchema), errorCatcher(createContact));

contactsRouter.put("/:id", validateBody(updateContactSchema), errorCatcher(updateContact));

export default contactsRouter;

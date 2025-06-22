import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;

  const contact = await getContactById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  const removedContact = await removeContact(id);
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(removedContact);
};

export const createContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  const updatedContact = await updateContactById(id, req.body);
  if (!updatedContact) {
      throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
};

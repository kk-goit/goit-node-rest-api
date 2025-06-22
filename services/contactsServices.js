import Contact from "../db/contacts,js";
import { randomUUID } from "crypto";

const listContacts = async () => Contact.findAll();

const getContactById = async (contactId) => Contact.findByPk(contactId);

async function removeContact(contactId) { 
  const contact = await getContactById(contactId);
  if (!contact) return null;

  Contact.destroy({ where: { id: contactId } });
  return contact;
}

const addContact = async (data) => Contact.create({
  id: randomUUID().replaceAll("-", "").substring(0, 21), ...data
});

async function updateContactById(contactId, newData) {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  return contact.update(newData, { returning: true });
}

export { listContacts, getContactById, removeContact, addContact, updateContactById };
import Contact from "../db/models/contacts.js";

const listContacts = async (userId) => Contact.findAll({where: { owner: userId }});

const getContactById = async (userId, contactId) => Contact.findOne({ where: { id: contactId, owner: userId }});

async function removeContact(userId, contactId) { 
  const contact = await getContactById(userId, contactId);
  if (!contact) return null;

  Contact.destroy({ where: { id: contactId } });
  return contact;
}

const addContact = async (data) => Contact.create(data);

async function updateContactById(userId, contactId, newData) {
  const contact = await getContactById(userId, contactId);
  if (!contact) return null;

  return contact.update(newData, { returning: true });
}

export { listContacts, getContactById, removeContact, addContact, updateContactById };
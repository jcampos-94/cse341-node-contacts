const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

async function getAllContacts(req, res) {
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
}

async function getSingleContact(req, res) {
  const contactId = new ObjectId(String(req.params.id));
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .findOne({ _id: contactId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

async function createContact(req, res) {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json({
      message: `Contact ${contact.firstName} ${contact.lastName} created succesfully.`
    });
  } else {
    res.status(500).json(response.error || 'An error ocurred while creating the contact.');
  }
}

async function updateContact(req, res) {
  const contactId = new ObjectId(String(req.params.id));
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .updateOne({ _id: contactId }, { $set: contact });
  if (response.modifiedCount > 0) {
    res.status(200).json({
      message: 'Contact updated succesfully.'
    });
  } else {
    res.status(500).json(response.error || 'An error ocurred while updating the contact.');
  }
}

async function deleteContact(req, res) {
  const contactId = new ObjectId(String(req.params.id));
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .deleteOne({ _id: contactId }, true);
  if (response.deletedCount > 0) {
    res.status(200).json({
      message: 'Contact deleted succesfully.'
    });
  } else {
    res
      .status(500)
      .json(response.error || "An error ocurred while deleting or contact doesn't exist.");
  }
}

module.exports = { getAllContacts, getSingleContact, createContact, updateContact, deleteContact };

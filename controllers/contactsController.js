const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

async function getAll(req, res) {
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
}

async function getSingle(req, res) {
  const contactId = new ObjectId(String(req.params.id));
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .findOne({ _id: contactId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(result);
}

module.exports = { getAll, getSingle };

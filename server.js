const express = require('express');
const mongodb = require('./data/database');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE //
app.use(bodyparser.json());

// Routes //
app.use('/', require('./routes'));
app.use('/contacts', require('./routes/contactsRoute'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening. Node running on port ${port}`);
    });
  }
});

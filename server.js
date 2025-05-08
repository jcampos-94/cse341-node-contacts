const express = require("express");

const mongodb = require("./data/database.js");
const app = express();

const port = process.env.PORT || 3000;

// MIDDLEWARE //
// Routes //
app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening. Node running on port ${port}`);
    });
  }
});

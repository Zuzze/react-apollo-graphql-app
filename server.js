const express = require("express");

const mongoose = require("mongoose");

// Mongoose Schemas
const Post = require("./models/Post");
const User = require("./models/User");

require("dotenv").config({ path: "variables.env" });

/* Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that connect node to database. 
It manages relationships between data, provides schema validation, and is used to translate between objects 
in code and the representation of those objects in MongoDB.
*/
mongoose
  .connect(process.env.MONGO_URI, {
    // ensures depracated tools are not used
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => console.error(err));
// remove depracated ensureIndex warning
mongoose.set("useCreateIndex", true);

// Initializes app
const app = express();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

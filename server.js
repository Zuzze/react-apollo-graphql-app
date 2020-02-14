const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const path = "/graphql";

// there were significant changes in apollo 2.0 and you don't need body-parser, makeExecutableSchemas etc anymore
// see more about migration here [https://www.apollographql.com/docs/apollo-server/migration-two-dot/](https://www.apollographql.com/docs/apollo-server/migration-two-dot/)

// Mongoose Schemas
const Post = require("./models/Post");
const User = require("./models/User");

// Middleware
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// Initializes app
const app = express();

// Initializes Apollo with GraphQL
// Open playground in http://localhost:4444/graphql
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ rew, res }) => ({
    Post,
    User
  })
});
server.applyMiddleware({ app, path });

const PORT = process.env.PORT || 4444;

corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

// Set up JWT authentication middleware

app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

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

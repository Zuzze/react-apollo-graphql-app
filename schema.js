// type definitions that GraphQL uses to name Schemas
// Have to match /models
const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Post {
    title: String!
    category: String!
    description: String!
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Post]
  }
  type Query {
    getAllPosts: [Post]
  }
`;

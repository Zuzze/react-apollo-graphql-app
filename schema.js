// type definitions that GraphQL uses to name Schemas
// Have to match /models
// You will see data in MongoDB at https://cloud.mongodb.com/ > collections
const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Post {
    _id: ID
    title: String!
    category: String!
    description: String!
    createdDate: String
    likes: Int
    username: String
  }

  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    joinDate: String
    favorites: [Post]
  }
  type Query {
    getAllPosts: [Post]
  }
  type Mutation {
    addPost(
      title: String!
      description: String!
      category: String!
      username: String
    ): Post
  }
`;

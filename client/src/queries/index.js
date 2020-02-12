import { gql } from "apollo-boost";

/* Post Queries */
export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      _id
      title
      description
      category
      likes
      createdDate
    }
  }
`;

/* Post Mutations */

/* User Queries */

/* User Mutations */

export const SIGNUP_USER = gql`
  mutation($username: String!, email: $email, password: $password ) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

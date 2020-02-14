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

export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

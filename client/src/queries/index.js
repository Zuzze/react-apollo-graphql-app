import { gql } from "apollo-boost";

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

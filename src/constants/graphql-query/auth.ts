import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      fullName
      email
      id
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      email
      fullName
    }
  }
`;

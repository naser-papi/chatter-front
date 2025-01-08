import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      email
      id
    }
  }
`;

import { gql } from "@apollo/client";

export const CREATE_CHAT = gql`
  mutation Mutation($data: CreateChatInput!) {
    createChat(data: $data) {
      isPrivate
      name
      userIds
      id
    }
  }
`;

export const CHATS = gql`
  query {
    chats {
      isPrivate
      name
      id
      userIds
    }
  }
`;

export const CHAT = gql`
    query($id: ID!) {
        chat(id: $id) {
            isPrivate
            name
            id
`;

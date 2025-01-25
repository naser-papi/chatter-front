import { gql } from "@apollo/client";

export const ON_MESSAGE_CREATED = gql`
  subscription Subscription($chatId: String!) {
    onMessageCreated(chatId: $chatId) {
      content
      userId
      chatId
      createAt
      id
    }
  }
`;

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
  query Query($id: String!) {
    chat(id: $id) {
      isPrivate
      name
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation Mutation($data: CreateMessageInput!) {
    createMessage(data: $data) {
      content
      userId
      createAt
      chatId
      id
    }
  }
`;

export const GET_MESSAGES = gql`
  query Query($chatId: String!) {
    messages(chatId: $chatId) {
      content
      userId
      chatId
      createAt
      id
    }
  }
`;

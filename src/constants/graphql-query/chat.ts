import { gql } from "@apollo/client";

export const ON_MESSAGE_CREATED = gql`
  subscription Subscription($chatIds: [String!]!) {
    onMessageCreated(chatIds: $chatIds) {
      content
      userId
      user {
        email
        fullName
      }
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
  query Query($skip: Int!, $limit: Int!) {
    chats(skip: $skip, limit: $limit) {
      isPrivate
      name
      id
      userIds
      lastMessage {
        id
        content
        createAt
        user {
          email
          fullName
        }
      }
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
      user {
        email
        fullName
      }
      userId
      createAt
      chatId
      id
    }
  }
`;

export const GET_MESSAGES = gql`
  query Query($chatId: String!, $skip: Int!, $limit: Int!) {
    messages(chatId: $chatId, skip: $skip, limit: $limit) {
      content
      user {
        email
        fullName
      }
      chatId
      createAt
      id
    }
  }
`;

import { gql } from "@apollo/client";

export const ON_MESSAGE_CREATED = gql`
  subscription Subscription($chatIds: [String!]!) {
    onMessageCreated(chatIds: $chatIds) {
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
      lastMessage {
        content
        createAt
        userId
      }
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
        content
        createAt
        user {
          email
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
      }
      chatId
      createAt
      id
    }
  }
`;

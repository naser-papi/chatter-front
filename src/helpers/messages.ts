import { MessageDto } from "@/dto/chat";
import { CHATS, GET_MESSAGES } from "@/constants/graphql-query";
import { ApolloCache } from "@apollo/client";
import { PAGE_COUNT } from "@/constants";

export function updateMessagesCache(
  cache: ApolloCache<any>,
  newMessage: MessageDto,
) {
  // Read the existing messages from the cache for the current chat
  const existingMessages: any = cache.readQuery({
    query: GET_MESSAGES,
    variables: {
      chatId: newMessage.chatId,
      skip: 0,
      limit: PAGE_COUNT,
    },
  });

  const existingChats: any = cache.readQuery({
    query: CHATS,
    variables: {
      skip: 0,
      limit: PAGE_COUNT,
    },
  });

  //Update the cache with the new message
  cache.writeQuery({
    query: GET_MESSAGES,
    variables: {
      chatId: newMessage.chatId,
      skip: 0,
      limit: PAGE_COUNT,
    },
    data: {
      messages: (existingMessages?.messages || []).concat(newMessage), // Append the new message
    },
  });

  // Update the lastMessage property of the corresponding chat in existingChats
  if (existingChats?.chats) {
    const updatedChats = existingChats.chats.map((chat: any) =>
      chat.id === newMessage.chatId
        ? { ...chat, lastMessage: { ...newMessage } }
        : chat,
    );

    cache.writeQuery({
      query: CHATS,
      variables: {
        skip: 0,
        limit: PAGE_COUNT,
      },
      data: {
        chats: updatedChats,
      },
    });
  }
}

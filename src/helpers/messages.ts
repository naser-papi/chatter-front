import { MessageDto } from "@/dto/chat";
import { CHATS, GET_MESSAGES } from "@/constants/graphql-query";
import { ApolloCache } from "@apollo/client";

export function updateMessagesCache(
  cache: ApolloCache<any>,
  newMessage: MessageDto,
) {
  // Read the existing messages from the cache for the current chat
  const existingMessages: any = cache.readQuery({
    query: GET_MESSAGES,
    variables: {
      chatId: newMessage.chatId,
    },
  });

  const existingChats: any = cache.readQuery({
    query: CHATS,
  });

  // Update the cache with the new message
  cache.writeQuery({
    query: GET_MESSAGES,
    variables: {
      chatId: newMessage.chatId,
    },
    data: {
      messages: (existingMessages?.messages || []).concat(newMessage), // Append the new message
    },
  });

  // Update the lastMessage property of the corresponding chat in existingChats
  if (existingChats?.chats) {
    const updatedChats = existingChats.chats.map((chat: any) =>
      chat.id === newMessage.chatId
        ? { ...chat, lastMessage: newMessage.content }
        : chat,
    );

    cache.writeQuery({
      query: CHATS,
      data: {
        chats: updatedChats,
      },
    });
  }
}

import { MessageDto } from "@/dto/chat";
import { GET_MESSAGES } from "@/constants/graphql-query";
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
}

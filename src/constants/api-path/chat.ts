import { IAPIInfo } from "@/types/base";

export const ChatPath = {
  getMessagesCount: {
    url: "messages/count/{chatId}",
    method: "GET",
    params: {
      chatId: "",
    },
  },
  getChatsCount: {
    url: "chats/count",
    method: "GET",
  },
} satisfies { [key: string]: IAPIInfo };

import { IAPIInfo } from "@/types/base";

export const ChatPath = {
  getChatsCount: {
    url: "chats/count",
    method: "GET",
  },
} satisfies { [key: string]: IAPIInfo };

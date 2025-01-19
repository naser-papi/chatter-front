import { BaseDto } from "@/dto/base.ts";

export interface ChatItemDto extends BaseDto {
  isPrivate: boolean;
  name?: string;
  userIds?: string[];
}

export interface CreateChatDto extends BaseDto {
  createChat: ChatItemDto;
}

export interface ChatListDto {
  chats: ChatItemDto[];
}

export interface ChatDto {
  chat: ChatItemDto;
}

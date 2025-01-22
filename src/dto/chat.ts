import { BaseDto } from "@/dto/base";

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

export interface MessageDto {
  content: string;
  chatId: string;
  userId?: string;
  createdAt?: Date;
  id?: string;
}

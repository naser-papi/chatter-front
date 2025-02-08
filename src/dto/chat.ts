import { BaseDto } from "@/dto/base";
import { UserDto } from "@/dto/auth";

export interface ChatItemDto extends BaseDto {
  isPrivate: boolean;
  name?: string;
  userIds?: string[];
  lastMessage?: MessageDto;
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
  user?: UserDto;
  createAt?: string;
  id?: string;
}

import { BaseDto } from "./base";

export interface CreateUserDto extends BaseDto {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserDto {
  email: string;
  fullName: string;
  avatarUrl?: string;
}

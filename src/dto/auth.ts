import { BaseDto } from "./base.ts";

export interface CreateUserDto extends BaseDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

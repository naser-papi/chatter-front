import { LoginDto } from "@/dto/auth";
import { IAPIInfo } from "@/types/base";

export const AuthPath = {
  login: {
    url: "auth/login",
    method: "POST",
    body: {
      email: "",
      password: "",
    } as LoginDto,
  },
} satisfies { [key: string]: IAPIInfo };

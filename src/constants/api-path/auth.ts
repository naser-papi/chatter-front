import { IAPIInfo } from "../../types/base.ts";
import { LoginDto } from "../../dto/auth.ts";

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

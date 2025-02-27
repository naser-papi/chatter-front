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
  logout: {
    url: "auth/logout",
    method: "POST",
  },
  updateProfile: {
    url: "users/update-profile",
    method: "PUT",
    body: null as FormData | null,
  },
} satisfies { [key: string]: IAPIInfo };

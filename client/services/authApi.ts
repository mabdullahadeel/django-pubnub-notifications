import { LoginResponse } from "../types/auth.types";
import {
  UserLoginPaylod,
  UserRegisterPaylod,
  MeResponse,
} from "../types/user.types";
import axiosInstance from "./axios";

export const authApi = {
  register: (payload: UserRegisterPaylod) => {
    return axiosInstance.post<LoginResponse>("/users/register/", {
      ...payload,
    });
  },
  login: (payload: UserLoginPaylod) => {
    return axiosInstance.post<LoginResponse>("/users/login/", {
      ...payload,
    });
  },
  me: () => {
    return axiosInstance.get<MeResponse>("/users/me/");
  },
};

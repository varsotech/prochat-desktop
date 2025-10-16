import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@varsotech/prochat/prochat/v1/auth_pb";
import { AxiosResponse } from "axios";
import axios from "./axios";
import { useMutation } from "./reactquery";

export function useLogin() {
  return useMutation<LoginRequest, AxiosResponse<LoginResponse>>(
    async (req: LoginRequest) => await axios.post("/api/v1/auth/login", req),
    { mutationKey: ["login"] }
  );
}

export function useRegister() {
  return useMutation<RegisterRequest, AxiosResponse<RegisterResponse>>(
    async (req: RegisterRequest) =>
      await axios.post("/api/v1/auth/register", req),
    { mutationKey: ["login"] }
  );
}


import { api, EndpointsEnum } from "@/src/axios";

import { type ApiArgs } from "./RegisterForm.type";

class RegisterFormApi {
  static async fetchUserRegData({ email, hash }: ApiArgs) {
    if (email) {
      return api.post(EndpointsEnum.REGISTRATION, {
        email,
      });
    }
    return api.post(EndpointsEnum.CONFIRM, {
      hash,
    });
  }
}

export default RegisterFormApi;

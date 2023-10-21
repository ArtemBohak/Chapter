import axios, { AxiosPromise } from "axios";
import { EndpointsEnum } from "@/src/axios";

type RefreshTokenType = {
  token: string;
  tokenExpires: number;
};

class TokenService {
  static async refreshToken(): AxiosPromise<RefreshTokenType> {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}${EndpointsEnum.REFRESH}`
    );
    return response;
  }
}

export default TokenService;

import axios, { AxiosPromise } from "axios";
import { EndpointsEnum } from "../axios/endpoints.types";

type RefreshTokenType = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
};

class TokenService {
  static async refreshToken(): AxiosPromise<RefreshTokenType> {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}${EndpointsEnum.REFRESH}`
    );
    return response;
  }
}

export default TokenService;

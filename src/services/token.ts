import axios, { AxiosPromise } from "axios";
import { EndpointsEnum } from "../axios/endpoints.types";

type RefreshTokenType = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
};

class TokenService {
  static async refreshToken(): AxiosPromise<RefreshTokenType> {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}${EndpointsEnum.REFRESH}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return response;
  }
}

export default TokenService;

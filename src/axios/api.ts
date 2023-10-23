import axios from "axios";
import { TokenService } from "@/src/services";
import {
  getTokenFromLC,
  keyValue,
  removeDataFromLS,
  setDataToLS,
} from "@/src/utils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  method: "get, post, put, delete, patch",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (getTokenFromLC())
      config.headers.Authorization = "Bearer" + " " + getTokenFromLC();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!getTokenFromLC()) return Promise.reject(error);

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      error.config._isRetry = true;
      try {
        const response = await TokenService.refreshToken();
        const { token } = response.data;
        setDataToLS({ token });

        return api.request(originalRequest);
      } catch (e) {
        removeDataFromLS(keyValue.ACCESS_TOKEN);
        return Promise.reject(error);
      }
    }
    throw error;
  }
);

export default api;

import axios, { AxiosResponse } from "axios";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

import { logout } from "@/src/redux";
import { keysValue } from "@/src/types";
import { EndpointsEnum } from ".";
import { RefreshTokenType } from "./axios.type";
import { getTokenFromLC, removeDataFromLS, setDataToLS } from "@/src/utils";

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

export const setResponseApiInterceptor = (store: ToolkitStore) =>
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
          const {
            data: { token },
          }: AxiosResponse<RefreshTokenType> = await axios.post(
            import.meta.env.VITE_API_BASE_URL + EndpointsEnum.REFRESH,
            null,
            {
              withCredentials: true,
            }
          );

          setDataToLS({ token });

          return api.request(originalRequest);
        } catch (e) {
          removeDataFromLS(keysValue.ACCESS_TOKEN);
          store.dispatch(logout());
          return Promise.reject(error);
        }
      }
      throw error;
    }
  );
export default api;

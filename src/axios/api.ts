import axios, { AxiosResponse } from "axios";

import { logoutUser, store } from "@/src/redux";
import { getTokenFromLC, removeDataFromLS, setDataToLS } from "@/src/utils";
import { keysValue } from "@/src/types";
import { RefreshTokenType } from "./axios.type";
import { EndpointsEnum } from ".";

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

    if (!getTokenFromLC()) store.dispatch(logoutUser());

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
        /* 
          The problem happens on the deploy when we try to refresh our token
          since the url for this request becomes /api/v1auth/refresh and not /api/v1/auth/refresh
          on the deploment because the env API_BASE_URL doesn't include the last "/" symbol.
          However, we might change it and add "/" at the end of the env
        */
        let apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL
        if (apiBaseUrl[apiBaseUrl.length - 1] !== '/') {
          apiBaseUrl += '/' 
        }
        const {
          data: { token },
        }: AxiosResponse<RefreshTokenType> = await axios.post(
          apiBaseUrl + EndpointsEnum.REFRESH,
          null,
          {
            withCredentials: true,
          }
        );

        setDataToLS({ token });

        return api.request(originalRequest);
      } catch (e) {
        removeDataFromLS(keysValue.ACCESS_TOKEN);
        store.dispatch(logoutUser());
        return Promise.reject(error);
      }
    }
    throw error;
  }
);

export default api;

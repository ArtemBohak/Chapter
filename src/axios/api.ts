import axios from "axios";

import { BaseURLEnum } from "./endpoints.types";

const api = axios.create({
  //will be changed to const from .env later
  baseURL: BaseURLEnum.API,
  withCredentials: false,
  method: "get, post, put, delete",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;

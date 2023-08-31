import axios from "axios";

const api = axios.create({
  //will be changed to const from .env later
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  method: "get, post, put, delete",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;

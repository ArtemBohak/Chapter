import axios from "axios";

export const googleOAuthApi = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_BASE_URL,
});

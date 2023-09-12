import axios from "axios";

const googleOAuthApi = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_BASE_URL,
});

export default googleOAuthApi;

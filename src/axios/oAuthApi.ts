import axios from "axios";

const oAuthApi = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_BASE_URL,
});

export default oAuthApi;

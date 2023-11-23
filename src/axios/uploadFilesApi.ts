import axios from "axios";
import { axiosLoadChecker } from "../utils";

const controller = new AbortController();

const uploadFilesApi = axios.create({
  baseURL: import.meta.env.VITE_CLOUDINARY_API_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
  signal: controller.signal,
  onUploadProgress: axiosLoadChecker(controller),
});

export default uploadFilesApi;

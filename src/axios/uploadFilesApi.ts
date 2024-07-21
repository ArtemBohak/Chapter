import axios from "axios";
import { axiosUploadChecker } from "../utils";

const controller = new AbortController();

const uploadFilesApi = axios.create({
  baseURL: import.meta.env.VITE_CLOUDINARY_API_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
  signal: controller.signal,
  onUploadProgress: axiosUploadChecker(controller),
});

export default uploadFilesApi;

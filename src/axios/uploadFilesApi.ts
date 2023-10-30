import axios from "axios";

const uploadFilesApi = axios.create({
  baseURL: import.meta.env.VITE_CLOUDINARY_API_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

export default uploadFilesApi;

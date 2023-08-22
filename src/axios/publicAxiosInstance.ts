import axios from "axios";

const PublicAxiosInstance = axios.create({
  //will be changed to const from .env later
  baseURL: "https://obscure-island-84086-0710166a71eb.herokuapp.com",
});

export default PublicAxiosInstance;

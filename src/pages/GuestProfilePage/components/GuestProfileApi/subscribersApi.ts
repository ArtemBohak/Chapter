import { api } from "@/src/axios";

const subscribersApi = async () => {
   const response = await api.get("users/my-follow")
  
   return response;
  };

  export default subscribersApi;
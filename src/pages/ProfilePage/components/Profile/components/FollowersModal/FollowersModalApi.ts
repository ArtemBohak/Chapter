import { EndpointsEnum, api } from "@/src/axios";
import { isAxiosError } from "axios";


const followersModalApi = async (page: number) => {
    try {
      const response = await api.get(`${EndpointsEnum.USERS_FOLLOWERS}?page=${page}&limit=10`);
        
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        return error.response?.data;
      }
    }
  };
  
  export default followersModalApi;
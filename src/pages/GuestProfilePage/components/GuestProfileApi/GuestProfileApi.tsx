import { isAxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";

const GuestProfileApi = async (Id: string) => {
  try {
    const response = await api.get(`${EndpointsEnum.USERS_PROFILE}${Id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export default GuestProfileApi;

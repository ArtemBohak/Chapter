import { isAxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";

const guestProfileApi = async (Id: string | number | undefined) => {
  try {
    const response = await api.get(`${EndpointsEnum.USERS_PROFILE}${Id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export default guestProfileApi;

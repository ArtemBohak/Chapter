import { isAxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { SetErrorType } from "@/src/types";

const GuestProfileApi = async (Id: string, setError: SetErrorType) => {
  try {
    const response = await api.get(`${EndpointsEnum.USERS_PROFILE}${Id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      setError(error);
      return error.response?.data;
    }
  }
};

export default GuestProfileApi;

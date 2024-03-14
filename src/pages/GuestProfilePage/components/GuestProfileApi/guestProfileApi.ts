import { isAxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { NavigateFunction } from "react-router-dom";
import { SetErrorType, links } from "@/src/types";

const guestProfileApi = async (
  Id: string | number | undefined,
  navigate?: NavigateFunction,
  setErrorBoundary?: SetErrorType
) => {
  try {
    const response = await api.get(`${EndpointsEnum.USERS_PROFILE}${Id}`);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      setErrorBoundary && setErrorBoundary(error);

      if (error.response?.status === 404)
        return navigate && navigate(links.HOME);

      return error.response?.data;
    }
  }
};

export default guestProfileApi;

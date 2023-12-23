import { isAxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";
import { bookProps } from "./AddBookForm.type";


const AddBookApi = async (values: bookProps) => {
  try {
    const response = await api.post(EndpointsEnum.USERS_BOOKS, values);

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export default AddBookApi;
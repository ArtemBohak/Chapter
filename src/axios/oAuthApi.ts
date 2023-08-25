import axios from "axios";

import { BaseURLEnum } from "./endpoints.types";

const oAuthApi = axios.create({ baseURL: BaseURLEnum.GOOGLE_API });

export default oAuthApi;

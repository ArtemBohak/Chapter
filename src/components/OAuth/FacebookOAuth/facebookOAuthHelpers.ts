import { api, EndpointsEnum } from "@/src/axios";
import { tryCatchWrapper } from "@/src/utils";
import { type Data } from "@/src/types";

export const facebookOAuthApi = tryCatchWrapper((data: Data) =>
  api.post(EndpointsEnum.FACEBOOK_LOGIN, {
    accessToken: data.facebookAccessToken,
  })
);

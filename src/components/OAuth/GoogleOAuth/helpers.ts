import { oAuthApi } from "@/src/axios";

import { tryCatchWrapper } from "@/src/utils";
import { type Data } from "@/src/types";

const {
  VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_CLIENT_SECRET,
  VITE_GOOGLE_REDIRECT_URI,
} = import.meta.env;

export const getAuthCode = tryCatchWrapper((data: Data) =>
  oAuthApi.post("/token", null, {
    params: {
      grant_type: "authorization_code",
      client_id: VITE_GOOGLE_CLIENT_ID,
      client_secret: VITE_GOOGLE_CLIENT_SECRET,
      redirect_uri: VITE_GOOGLE_REDIRECT_URI,
      code: data.code,
    },
  })
);

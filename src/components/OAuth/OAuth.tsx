import { FC, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { nanoid } from "@reduxjs/toolkit";

import { getCookies, keyValue, setCookies } from "@/src/utils";
import { OAuthProps, OAuthVariant } from "./OAuth.type";

import Twitter from "./Twitter/Twitter";
import Facebook from "./Facebook/Facebook";
import Google from "./Google/Google";

const {
  VITE_BASE_OAUTH_STATE,
  VITE_STATE_ID_COOKIE_LIFETIME,
  VITE_GOOGLE_CLIENT_ID,
} = import.meta.env;

const OAuth: FC<OAuthProps> = (props) => {
  const [cStateId] = getCookies(keyValue.STATE_ID);

  const stateId = cStateId ? cStateId : VITE_BASE_OAUTH_STATE;

  useEffect(() => {
    if (!cStateId) {
      setCookies(
        { stateId: nanoid() },
        VITE_STATE_ID_COOKIE_LIFETIME,
        undefined,
        true
      );
    }
  }, [cStateId]);

  if (props.oAuthVariant === OAuthVariant.GOOGLE)
    return (
      <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
        <Google stateId={stateId} {...props} />
      </GoogleOAuthProvider>
    );

  if (props.oAuthVariant === OAuthVariant.FACEBOOK)
    return <Facebook stateId={stateId} {...props} />;

  if (props.oAuthVariant === OAuthVariant.TWITTER)
    return <Twitter stateId={stateId} {...props} />;
};

export default OAuth;

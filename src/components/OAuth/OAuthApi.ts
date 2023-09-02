import { googleOAuthApi, api, EndpointsEnum } from "@/src/axios";
import { SetURLSearchParams } from "react-router-dom";

import {
  type ApiDataArgs,
  IOAuthApiType,
  OAuthApiEndPoints,
} from "./OAuth.type";

const {
  VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_CLIENT_SECRET,
  VITE_TWITTER_STATE,
  VITE_TWITTER_CLIENT_ID,
  VITE_TWITTER_CODE_VERIFIER,
} = import.meta.env;

class OAuthApi {
  redirectUri: string;
  token: string;
  googleOAuthGrandType: string;
  googleClientId: string;
  googleClientSecret: string;
  url: string;
  setSearchParams: SetURLSearchParams | null;
  setAuthCode: ((data: string) => void) | null;
  navigate: (data: string) => void;

  static async facebookApi({ facebookAccessToken }: ApiDataArgs) {
    return api.post(EndpointsEnum.FACEBOOK_LOGIN, {
      accessToken: facebookAccessToken,
    });
  }

  static async googleApi({ googleIdToken }: ApiDataArgs) {
    return api.post(EndpointsEnum.GOOGLE_LOGIN, {
      idToken: googleIdToken,
    });
  }

  static getTwitterOAuthUrl(redirectUri: string) {
    const rootUrl = import.meta.env.VITE_TWITTER__AUTH_CODE_BASE_URL;
    const options = {
      redirect_uri: redirectUri,
      client_id: VITE_TWITTER_CLIENT_ID,
      state: VITE_TWITTER_STATE,
      response_type: "code",
      code_challenge: VITE_TWITTER_CODE_VERIFIER,
      code_challenge_method: "plain",
      scope: ["users.read", "offline.access"].join(" "),
    };
    const qs = new URLSearchParams(options).toString();
    return `${rootUrl}?${qs}`;
  }

  constructor({
    redirectUri = "",
    url = "",
    token = "",
    setSearchParams = null,
    setAuthCode = null,
    navigate,
  }: IOAuthApiType) {
    this.redirectUri = redirectUri;
    this.token = token;
    this.googleOAuthGrandType = "authorization_code";
    this.googleClientId = VITE_GOOGLE_CLIENT_ID;
    this.googleClientSecret = VITE_GOOGLE_CLIENT_SECRET;
    this.url = url;
    this.setSearchParams = setSearchParams;
    this.setAuthCode = setAuthCode;
    this.navigate = navigate;
  }

  async getGoogleAuthCode() {
    return googleOAuthApi.post(OAuthApiEndPoints.GOOGLE_TOKEN, null, {
      params: {
        grant_type: this.googleOAuthGrandType,
        client_id: this.googleClientId,
        client_secret: this.googleClientSecret,
        redirect_uri: this.redirectUri,
        code: this.token,
      },
    });
  }

  async googleDataHandler() {
    try {
      const cred = await this.getGoogleAuthCode();

      const response = await OAuthApi.googleApi({
        googleIdToken: cred.data.id_token,
      });

      console.log(response);

      this.navigate(this.url);
    } catch (error) {
      console.log(error);
    } finally {
      this.setSearchParams && this.setSearchParams("");
      this.setAuthCode && this.setAuthCode("");
    }
  }

  async facebookDataHandler() {
    try {
      const response = await OAuthApi.facebookApi({
        facebookAccessToken: this.token,
      });
      console.log(response);
      this.navigate(this.url);
    } catch (error) {
      console.log(error);
    } finally {
      this.setSearchParams && this.setSearchParams("");
      this.setAuthCode && this.setAuthCode("");
    }
  }

  async twitterDataHandler() {
    try {
      console.log("POST auth/twitter/login => ", this.token);
      this.navigate(this.url);
    } catch (error) {
      console.log(error);
    } finally {
      this.setSearchParams && this.setSearchParams("");
      this.setAuthCode && this.setAuthCode("");
    }
  }
}

export default OAuthApi;
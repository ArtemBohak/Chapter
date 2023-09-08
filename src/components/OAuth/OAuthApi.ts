import { SetURLSearchParams } from "react-router-dom";
import { googleOAuthApi, api, EndpointsEnum } from "@/src/axios";

// import { AppDispatch } from "@/src/redux/store";
// import { loginBy } from "@/src/redux/slices/user";
import {
  type ApiDataArgs,
  OAuthApiArgs,
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
  protected redirectUri: string | undefined;
  protected token: string | undefined;
  protected setSearchParams: SetURLSearchParams | null;
  protected setAuthCode: ((data: string) => void) | null;
  protected navigate: (data: string) => void;
  // protected dispatch: AppDispatch;
  protected setLoading: (data: boolean) => void;

  protected googleOAuthGrandType = "authorization_code";
  protected googleClientId = VITE_GOOGLE_CLIENT_ID;
  protected googleClientSecret = VITE_GOOGLE_CLIENT_SECRET;
  protected static url = ["/auth/account-creation", "/feed"];

  protected static async facebookApi({ facebookAccessToken }: ApiDataArgs) {
    return api.post(EndpointsEnum.FACEBOOK_LOGIN, {
      accessToken: facebookAccessToken,
    });
  }

  protected static async googleApi({ googleIdToken }: ApiDataArgs) {
    return api.post(EndpointsEnum.GOOGLE_LOGIN, {
      idToken: googleIdToken,
    });
  }

  protected static getRedirectUserUrl(hasNickName: boolean, id?: number) {
    const [accountCreate, feed] = OAuthApi.url;
    return hasNickName ? feed : accountCreate + "/" + id;
  }

  static getTwitterOAuthUrl(redirectUri: string, stateId: string) {
    const rootUrl = import.meta.env.VITE_TWITTER__AUTH_CODE_BASE_URL;
    const options = {
      redirect_uri: redirectUri,
      client_id: VITE_TWITTER_CLIENT_ID,
      state: VITE_TWITTER_STATE + stateId,
      response_type: "code",
      code_challenge: VITE_TWITTER_CODE_VERIFIER,
      code_challenge_method: "plain",
      scope: ["users.read", "offline.access"].join(" "),
    };
    const qs = new URLSearchParams(options).toString();
    return `${rootUrl}?${qs}`;
  }

  constructor({
    redirectUri,
    token,
    setSearchParams = null,
    setAuthCode = null,
    navigate,
    // dispatch,
    setLoading,
  }: OAuthApiArgs) {
    this.redirectUri = redirectUri;
    this.token = token;
    this.setSearchParams = setSearchParams;
    this.setAuthCode = setAuthCode;
    this.navigate = navigate;
    // this.dispatch = dispatch;
    this.setLoading = setLoading;
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
    this.setLoading(true);
    try {
      const cred = await this.getGoogleAuthCode();

      const { data } = await OAuthApi.googleApi({
        googleIdToken: cred.data.id_token,
      });

      console.log(data);
      if (data.user.nickName) {
        // this.dispatch(loginBy(data.user));
        return this.navigate(OAuthApi.getRedirectUserUrl(true));
      }

      this.navigate(OAuthApi.getRedirectUserUrl(false, data.user.id));
    } catch (error) {
      console.log(error);
    } finally {
      this.clearData();
    }
  }

  async facebookDataHandler() {
    this.setLoading(true);
    try {
      const { data } = await OAuthApi.facebookApi({
        facebookAccessToken: this.token,
      });
      console.log(data);
      if (data.user.nickName) {
        // this.dispatch(loginBy(data.user));
        return this.navigate(OAuthApi.getRedirectUserUrl(true));
      }

      this.navigate(OAuthApi.getRedirectUserUrl(false, data.user.id));
    } catch (error) {
      console.log(error);
    } finally {
      this.clearData();
    }
  }

  async twitterDataHandler() {
    this.setLoading(true);
    try {
      console.log("POST auth/twitter/login => ", this.token);
      this.navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      this.clearData();
    }
  }

  clearData() {
    this.setLoading(false);
    this.setSearchParams && this.setSearchParams("");
    this.setAuthCode && this.setAuthCode("");
  }
}

export default OAuthApi;

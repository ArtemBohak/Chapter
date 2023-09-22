import { AxiosError } from "axios";

import OAuthApi from "../OAuthApi";
import { OAuthApiArgs, OAuthApiEndPoints } from "../OAuth.type";
import { googleOAuthApi, api, EndpointsEnum } from "@/src/axios";

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = import.meta.env;
class GoogleApi extends OAuthApi {
  protected redirectUri: string | undefined;
  protected googleOAuthGrandType = "authorization_code";
  protected googleClientId = VITE_GOOGLE_CLIENT_ID;
  protected googleClientSecret = VITE_GOOGLE_CLIENT_SECRET;

  protected static async googleApi(googleIdToken: string) {
    return api.post(EndpointsEnum.GOOGLE_LOGIN, {
      idToken: googleIdToken,
    });
  }

  constructor({
    token,
    redirectUri,
    setSearchParams,
    navigate,
    setIsLoading,
    setAuthCode,
    dispatch,
  }: OAuthApiArgs) {
    super({
      token,
      setSearchParams,
      navigate,
      setIsLoading,
      setAuthCode,
      dispatch,
    });
    this.redirectUri = redirectUri;
  }

  protected async getGoogleAuthCode() {
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

  public async login() {
    this.pendingData();
    try {
      const cred = await this.getGoogleAuthCode();

      const {
        data: { token, tokenExpires, user },
      } = await GoogleApi.googleApi(cred.data.id_token);
      if (user.nickName) this.saveData({ token, tokenExpires, user });

      this.navigate(this.createRedirectUserUrl(user.nickName, user.id));
    } catch (error) {
      if (error instanceof AxiosError) this.errorData(error.message);
    } finally {
      this.clearData();
    }
  }
}

export default GoogleApi;

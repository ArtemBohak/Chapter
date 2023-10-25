import { AxiosPromise } from "axios";

import { googleOAuthApi, api, EndpointsEnum } from "@/src/axios";
import { OAuthApiArgs, OAuthApiEndPoints } from "../OAuth.type";
import { AuthApiConstructor } from "@/src/services";

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = import.meta.env;

class GoogleApi extends AuthApiConstructor {
  private redirectUri: string | undefined;
  private googleOAuthGrandType = "authorization_code";
  private googleClientId = VITE_GOOGLE_CLIENT_ID;
  private googleClientSecret = VITE_GOOGLE_CLIENT_SECRET;

  constructor({
    token,
    redirectUri,
    navigate,
    setIsLoading,
    dispatch,
  }: OAuthApiArgs) {
    super(dispatch, token, setIsLoading, navigate);
    this.redirectUri = redirectUri;

    this.login();
  }

  private async google(googleIdToken: string): AxiosPromise {
    return api.post(EndpointsEnum.GOOGLE_LOGIN, {
      idToken: googleIdToken,
    });
  }

  private async getGoogleAuthCode() {
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

  private login = this.tryCatchWrapper(async () => {
    const cred = await this.getGoogleAuthCode();
    const res = await this.google(cred.data.id_token);

    const { token, user } = res.data;

    user.nickName && this.handleData(user, { token });

    !user.nickName && this.redirect(user);

    return res;
  });
}

export default GoogleApi;

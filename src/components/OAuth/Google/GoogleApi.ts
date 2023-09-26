import OAuthApi from "../OAuthApi";
import { OAuthApiArgs, OAuthApiEndPoints } from "../OAuth.type";
import { googleOAuthApi, api, EndpointsEnum } from "@/src/axios";

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = import.meta.env;
class GoogleApi extends OAuthApi {
  protected redirectUri: string | undefined;
  protected googleOAuthGrandType = "authorization_code";
  protected googleClientId = VITE_GOOGLE_CLIENT_ID;
  protected googleClientSecret = VITE_GOOGLE_CLIENT_SECRET;

  constructor({
    token,
    redirectUri,
    setSearchParams,
    navigate,
    setIsLoading,
    setAuthCode,
    dispatch,
  }: OAuthApiArgs) {
    super(
      token,
      setSearchParams,
      setAuthCode,
      navigate,
      dispatch,
      setIsLoading
    );
    this.redirectUri = redirectUri;
  }

  private async google(googleIdToken: string) {
    return api.post(EndpointsEnum.GOOGLE_LOGIN, {
      idToken: googleIdToken,
    });
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

  login = this.tryCatchWrapper(async () => {
    const cred = await this.getGoogleAuthCode();
    const res = await this.google(cred.data.id_token);

    const { token, tokenExpires, user } = res.data;
    if (user.nickName) this.handleData({ token, tokenExpires, user });

    this.navigate(this.redirect(user.nickName, user.id));
    return res;
  });
}

export default GoogleApi;

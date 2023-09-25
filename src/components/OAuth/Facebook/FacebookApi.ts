import OAuthApi from "../OAuthApi";
import { EndpointsEnum, api } from "@/src/axios";
import { OAuthApiArgs } from "../OAuth.type";

class FacebookApi extends OAuthApi {
  protected static async facebook(facebookAccessToken: string | undefined) {
    return api.post(EndpointsEnum.FACEBOOK_LOGIN, {
      accessToken: facebookAccessToken,
    });
  }
  constructor({
    token,
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
  }

  public login = this.tryCatchWrapper(async () => {
    const {
      data: { token, tokenExpires, user },
    } = await FacebookApi.facebook(this.token);

    if (user.nickName) this.saveData({ token, tokenExpires, user });

    this.navigate(this.createRedirectUserUrl(user.nickName, user.id));
  });
}

export default FacebookApi;

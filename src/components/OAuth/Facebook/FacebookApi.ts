import OAuthApi from "../OAuthApi";
import { EndpointsEnum, api } from "@/src/axios";
import { OAuthApiArgs } from "../OAuth.type";

class FacebookApi extends OAuthApi {
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
  private async facebook(facebookAccessToken: string | undefined) {
    return api.post(EndpointsEnum.FACEBOOK_LOGIN, {
      accessToken: facebookAccessToken,
    });
  }

  login = this.tryCatchWrapper(async () => {
    const res = await this.facebook(this.token);
    const { token, tokenExpires, user } = res.data;

    if (user.nickName) this.handleData({ token, tokenExpires, user });
    this.navigate(this.redirect(user.nickName, user.id));
    return res;
  });
}

export default FacebookApi;

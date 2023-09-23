import { AxiosError } from "axios";

import OAuthApi from "../OAuthApi";
import { EndpointsEnum, api } from "@/src/axios";
import { OAuthApiArgs } from "../OAuth.type";

class FacebookApi extends OAuthApi {
  protected static async facebookApi(facebookAccessToken: string | undefined) {
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

  public async login() {
    this.pendingData();
    try {
      const {
        data: { token, tokenExpires, user },
      } = await FacebookApi.facebookApi(this.token);

      if (user.nickName) this.saveData({ token, tokenExpires, user });

      this.navigate(this.createRedirectUserUrl(user.nickName, user.id));
    } catch (error) {
      if (error instanceof AxiosError) this.errorData(error.message);
    } finally {
      this.clearData();
    }
  }
}

export default FacebookApi;

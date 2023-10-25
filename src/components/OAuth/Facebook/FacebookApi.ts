import { OAuthApiArgs } from "../OAuth.type";
import { EndpointsEnum, api } from "@/src/axios";
import { AuthApiConstructor } from "@/src/services";

class FacebookApi extends AuthApiConstructor {
  constructor({ token, navigate, setIsLoading, dispatch }: OAuthApiArgs) {
    super(dispatch, token, setIsLoading, navigate);

    this.login();
  }
  private async facebook(facebookAccessToken: string | undefined) {
    return api.post(EndpointsEnum.FACEBOOK_LOGIN, {
      accessToken: facebookAccessToken,
    });
  }

  private login = this.tryCatchWrapper(async () => {
    const res = await this.facebook(this.token);
    const { token, user } = res.data;

    user.nickName && this.handleData(user, { token });

    !user.nickName && this.redirect(user);

    return res;
  });
}

export default FacebookApi;

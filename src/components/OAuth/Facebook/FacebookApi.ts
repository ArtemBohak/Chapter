import { EndpointsEnum, api } from "@/src/axios";
import { UserApiConstructor } from "@/src/services";
import { OAuthApiArgs } from "../OAuth.type";

class FacebookApi extends UserApiConstructor {
  constructor({ token, navigate, setIsLoading, setError }: OAuthApiArgs) {
    super(token, setIsLoading, navigate, setError);

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

    user.nickName && this.handleUserData(user, { token });

    !user.nickName && this.redirect(user);

    return res;
  });
}

export default FacebookApi;

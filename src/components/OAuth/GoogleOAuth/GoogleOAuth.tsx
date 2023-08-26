import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import { getAuthCode } from "./helpers";
import { type GoogleOAuthProps } from "./GoogleOAuth.type";
import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const GoogleOAuth: FC<GoogleOAuthProps> = ({ className, size = 24 }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (codeResponse) => {
      console.log("Google Login Success!", codeResponse);
      navigate("/");
      const { data } = await getAuthCode(codeResponse.code);

      console.log("POST auth/google/login => ", data.id_token);
    },
    onError: (onError) => {
      console.log("Google Login Failed!", onError);
    },
  });

  return (
    <button className={className} onClick={() => login()}>
      <Icon icon={IconEnum.Google} size={size} />
    </button>
  );
};

export default GoogleOAuth;

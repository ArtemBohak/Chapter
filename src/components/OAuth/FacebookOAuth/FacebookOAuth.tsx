import { FC } from "react";
import { useNavigate } from "react-router-dom";
import FacebookLogin, {
  SuccessResponse,
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

import { type FacebookOAuthProps } from "./FacebookOAuth.type";
import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const FacebookOAuth: FC<FacebookOAuthProps> = ({ className, size = 24 }) => {
  const navigate = useNavigate();

  const onSuccess = (response: SuccessResponse) => {
    console.log("Facebook Login Success!", response);
    navigate("/");
  };

  const onFail = (error: FailResponse) => {
    console.log("Facebook Login Failed!", error);
  };

  const onProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Get Facebook Profile Success!", response);
  };

  return (
    <FacebookLogin
      appId="3558758577715170"
      autoLoad={false}
      fields="name,email,picture"
      onSuccess={onSuccess}
      onFail={onFail}
      onProfileSuccess={onProfileSuccess}
      render={(renderProps) => {
        return (
          <button className={className} onClick={renderProps.onClick}>
            <Icon icon={IconEnum.Facebook} size={size} />
          </button>
        );
      }}
    />
  );
};

export default FacebookOAuth;

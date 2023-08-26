import { FC } from "react";
import { type TwitterOAuthProps } from "./TwitterOAuth.type";

import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const TwitterOAuth: FC<TwitterOAuthProps> = ({ className, size = 24 }) => {
  return (
    <button className={className}>
      <Icon icon={IconEnum.Twitter} size={size} />
    </button>
  );
};

export default TwitterOAuth;

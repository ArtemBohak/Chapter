import { FC } from "react";

import { useOAuth } from "./hooks/useOAuth";
import { type OAuthProps } from "./OAuth.type";

import { Icon } from "@/src/components/Icon";
import { IconEnum } from "@/src/components/Icon";

const OAuth: FC<OAuthProps> = ({ type, size = 24, className, url }) => {
  const { twitterUrl } = useOAuth({ type, url });

  if (type === "facebook") return <div>FACEBOOK</div>;
  if (type === "google") return <div>GOOGLE</div>;
  if (type === "twitter")
    return (
      <button
        className={className}
        onClick={() => window.location.replace(twitterUrl)}
      >
        <Icon icon={IconEnum.Twitter} size={size} />
      </button>
    );
};

export default OAuth;

import { FC, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { FollowButtonProps } from "./FollowButton.type";
import { useErrorBoundary } from "@/src/hooks";
import { EndpointsEnum, api } from "@/src/axios";

import { PostButton } from "..";

const FollowButton: FC<FollowButtonProps> = ({
  isSubscribeToAuthor,
  id,
  classNames,
  postsApi,
}) => {
  const [isFollow, setIsFollow] = useState(isSubscribeToAuthor);
  const setErrorBoundary = useErrorBoundary();

  useEffect(() => {
    setIsFollow(isSubscribeToAuthor);
  }, [isSubscribeToAuthor]);

  const onHandleClick = async () => {
    try {
      setIsFollow(!isFollow);
      setTimeout(async () => {
        await api.post(EndpointsEnum.FOLLOW_UNFOLLOW + `${id}`);

        postsApi && postsApi();
      }, 1000);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    }
  };
  const btnVariant = isFollow ? "outlined" : "contained";
  return (
    <PostButton
      onHandleClick={onHandleClick}
      variant={btnVariant}
      className={classNames}
    >
      {isFollow ? "Unfollow" : "Follow"}
    </PostButton>
  );
};

export default FollowButton;

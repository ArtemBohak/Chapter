import { FC, useState } from "react";
import { AxiosError } from "axios";

import { FollowButtonProps } from "./FollowButton.type";
import { useErrorBoundary } from "@/src/hooks";
import { EndpointsEnum, api } from "@/src/axios";

import { PostButton } from "../components";

const FollowButton: FC<FollowButtonProps> = ({
  isSubscribeToAuthor,
  id,
  classNames,
  fetchData,
}) => {
  const [isFollow, setIsFollow] = useState(isSubscribeToAuthor);
  const setErrorBoundary = useErrorBoundary();

  const onHandleClick = async () => {
    try {
      setIsFollow(!isFollow);
      await api.post(EndpointsEnum.FOLLOW_UNFOLLOW + `${id}`);
      fetchData && fetchData(id);
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

import { FC, useState } from "react";
import { AxiosError } from "axios";

import { useErrorBoundary, useFindUserId } from "@/src/hooks";
import { EndpointsEnum, api } from "@/src/axios";
import { FollowButtonProps } from "./FollowButton.type";

import { PostButton } from "../components";

const FollowButton: FC<FollowButtonProps> = ({
  followList,
  isSubscribed,
  id,
  fetchData,
  classNames,
}) => {
  const [isFollowing] = useFindUserId(followList);
  const [isFollow, setIsFollow] = useState(isSubscribed || isFollowing);

  const setError = useErrorBoundary();

  const onHandleClick = async () => {
    try {
      setIsFollow(!isFollow);
      fetchData && fetchData(id);
      await api.post(EndpointsEnum.SUBSCRIBE_USER + `/${id}`);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e);
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

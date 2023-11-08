import { FC, useState } from "react";

import { useFindUserId } from "@/src/hooks";
import { FollowButtonProps } from "./FollowButton.type";

import { PostButton } from "..";

const FollowButton: FC<FollowButtonProps> = ({
  followList,
  id,
  fetchData,
  classNames,
}) => {
  const [isFollowing] = useFindUserId(followList);
  const [isFollow, setIsFollow] = useState(isFollowing);

  const onHandleClick = () => {
    setIsFollow(!isFollow);
    fetchData && fetchData(id);
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

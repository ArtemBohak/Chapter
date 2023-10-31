import { FC, useState } from "react";

import { IFollowButtonProps } from "./FollowButton.type";

import FeedButton from "../../../FeedButton/FeedButton";
import { useFindUserId } from "@/src/hooks";

const FollowButton: FC<IFollowButtonProps> = ({ followList }) => {
  const [isFollowing] = useFindUserId(followList);

  const [isFollow, setIsFollow] = useState(isFollowing);

  const onHandleClick = () => {
    setIsFollow(!isFollow);
  };
  const btnVariant = isFollow ? "outlined" : "contained";
  return (
    <FeedButton onHandleClick={onHandleClick} variant={btnVariant}>
      {isFollow ? "Unfollow" : "Follow"}
    </FeedButton>
  );
};

export default FollowButton;

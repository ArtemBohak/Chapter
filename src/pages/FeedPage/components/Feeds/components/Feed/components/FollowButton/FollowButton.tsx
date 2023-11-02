import { FC, useState } from "react";

import { useFindUserId } from "@/src/hooks";
import { useFeedContext } from "@/src/pages/FeedPage/context";
import { FollowButtonProps } from "./FollowButton.type";

import { FeedButton } from "../";

const FollowButton: FC<FollowButtonProps> = ({ followList, id }) => {
  const { fetchData } = useFeedContext();
  const [isFollowing] = useFindUserId(followList);
  const [isFollow, setIsFollow] = useState(isFollowing);

  const onHandleClick = () => {
    setIsFollow(!isFollow);
    fetchData(id);
  };
  const btnVariant = isFollow ? "outlined" : "contained";
  return (
    <FeedButton onHandleClick={onHandleClick} variant={btnVariant}>
      {isFollow ? "Unfollow" : "Follow"}
    </FeedButton>
  );
};

export default FollowButton;

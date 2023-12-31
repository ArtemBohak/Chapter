import { FC, useState } from "react";

import { FollowButtonProps } from "./FollowButton.type";

import { PostButton } from "../components";

const FollowButton: FC<FollowButtonProps> = ({
  isSubscribeToAuthor,
  postId,
  classNames,
}) => {
  const [isFollow, setIsFollow] = useState(isSubscribeToAuthor);

  const onHandleClick = () => {
    setIsFollow(!isFollow);
    console.log(postId);
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

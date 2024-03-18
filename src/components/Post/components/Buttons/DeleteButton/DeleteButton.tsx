import { FC, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { useAppSelector } from "@/src/redux";
import { useErrorBoundary } from "@/src/hooks";
import { deleteCommentCB, postsCB } from "@/src/utils";
import { PostType } from "@/src/types";
import { DeleteButtonProps } from "./DeleteButton.type";
import styles from "../Buttons.module.scss";

import { Icon, IconEnum } from "@/src/components";

const DeleteButton: FC<DeleteButtonProps> = ({
  authorId,
  commentId,
  setPosts,
  setPost,
  setAllComments,
}) => {
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const setErrorBoundary = useErrorBoundary();
  const [isLoading, setIsLoading] = useState(false);

  const onHandleDelete = async () => {
    try {
      setIsLoading(true);
      const { data }: AxiosResponse<PostType> = await api.delete(
        EndpointsEnum.DELETE_COMMENTS + commentId
      );

      setPosts && setPosts(postsCB<PostType>(data, "postId"));
      setPost && setPost(data);
      setAllComments(deleteCommentCB(commentId));
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (userId === authorId)
    return (
      <button
        onClick={onHandleDelete}
        data-automation="clickButton"
        className={styles["icon-button"]}
        disabled={isLoading}
        aria-label="Delete comment button"
      >
        <Icon
          id="delete-icon"
          icon={IconEnum.TRASH}
          className={styles["icon-button__icon"]}
        />
        delete
      </button>
    );

  return null;
};

export default DeleteButton;

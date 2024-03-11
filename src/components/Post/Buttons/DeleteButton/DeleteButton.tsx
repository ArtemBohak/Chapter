import { FC } from "react";
import { AxiosError, AxiosResponse } from "axios";

import { EndpointsEnum, api } from "@/src/axios";
import { useAppSelector } from "@/src/redux";
import { useErrorBoundary } from "@/src/hooks";
import { postsCB } from "@/src/utils";
import { PostType } from "@/src/types";
import { DeleteButtonProps } from "./DeleteButton.type";
import styles from "../IconButtons.module.scss";

import { Icon, IconEnum } from "@/src/components";

const DeleteButton: FC<DeleteButtonProps> = ({
  authorId,
  commentId,
  setPosts,
}) => {
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const setErrorBoundary = useErrorBoundary();

  const onHandleDelete = async () => {
    try {
      const { data }: AxiosResponse<Array<PostType>> = await api.delete(
        EndpointsEnum.DELETE_COMMENTS + commentId
      );
      setPosts && setPosts(postsCB<PostType>(data, "postId"));
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    }
  };

  if (userId === authorId)
    return (
      <button
        onClick={onHandleDelete}
        data-automation="clickButton"
        className={styles["icon-button"]}
      >
        <Icon
          id="delete-icon"
          width={20}
          hanging={20}
          icon={IconEnum.TRASH}
          removeInlineStyle
          className={styles["icon-button__icon"]}
        />{" "}
        delete
      </button>
    );

  return null;
};

export default DeleteButton;

import { CommentValues } from "@/src/types";
import { createRef } from "react";
import { commentsPageLimit } from "@/src/utils";
import { CommentsTypes } from "@/src/services/PostApi/PostApi.type";

const commentsFindIndex = (comments: CommentsTypes, comment: CommentValues) =>
  comments.findIndex((el) => el.postId === comment.postId);

const commentsEdit = (comments: CommentsTypes) => {
  return comments.map((el, i) => {
    if (comments.length - 3 === i) {
      return {
        ...el,
        loaderRef: createRef<HTMLInputElement>(),
        pageValue: Math.ceil(comments.length / commentsPageLimit) + 1,
      };
    }
    return {
      ...el,
    };
  });
};

export const commentsCb =
  (commentsApiData: CommentValues) => (comments: CommentsTypes) => {
    let index: number;

    if (Array.isArray(commentsApiData)) {
      for (const commentData of commentsApiData) {
        index = commentsFindIndex(comments, commentData);

        if (index !== -1) {
          comments[index] = { ...comments[index], ...commentData };
        } else comments = [...comments, commentData];
      }

      return commentsEdit(comments);
    } else {
      index = commentsFindIndex(comments, commentsApiData);

      if (index !== -1) {
        comments[index] = { ...comments[index], ...commentsApiData };
      }
    }

    return comments;
  };

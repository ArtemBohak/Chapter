import { CommentRefType } from "@/src/types";
import { postDataEdit, dataFindIndex } from "../helpers";
import { commentsPageLimit } from "../..";

export const postsCB =
  <T>(postsApiData: Array<T> | T, key: string, pageLimit: number = 5) =>
    (posts: Array<T>) => {
      let postsC = [...posts];
      let index: number;
      if (Array.isArray(postsApiData)) {
        for (const postApiData of postsApiData) {
          index = dataFindIndex<T>(postsC, postApiData, key as keyof T);
          if (index !== -1) postsC[index] = { ...postsC[index], ...postApiData };
          else postsC = [...postsC, postApiData];
        }
      } else {
        index = dataFindIndex<T>(postsC, postsApiData, key as keyof T);
        if (index !== -1) postsC[index] = { ...postsC[index], ...postsApiData };
      }
      return postDataEdit<T>(postsC, pageLimit);
    };

export const deleteCommentCB =
  (commentId: string | number) => (comments: CommentRefType[]) => {
    const updatedComments: CommentRefType[] = [];

    for (const comment of comments) {
      const subComments = [];
      if (comment.comments) {
        for (const subComment of comment.comments) {
          if (subComment.id === commentId) continue;

          subComments.push(subComment);
        }
      }

      if (comment.id === commentId) continue;

      updatedComments.push({
        ...comment,
        comments: [...subComments],
        pageValue: undefined,
        pageLoaderRef: undefined,
      });
    }
    return postDataEdit(updatedComments, commentsPageLimit);
  };

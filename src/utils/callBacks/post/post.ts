import { pageLimit } from "@/src/utils";
import { postDataEdit, postDataFindIndex } from "../helpers";
import { PostsRef } from "../callBacks.type";

export const postsCB =
  <T extends object>(postsApiData: Array<T> | T, key: keyof T) =>
  (posts: Array<T & PostsRef>) => {
    let postsC = [...posts];
    let index: number;

    if (Array.isArray(postsApiData)) {
      for (const postApiData of postsApiData) {
        index = postDataFindIndex<T>(postsC, postApiData, key);

        if (index !== -1) {
          postsC[index] = { ...postsC[index], ...postApiData };
        } else postsC = [...postsC, postApiData];
      }

      return postDataEdit<T>(postsC, pageLimit);
    } else {
      index = postDataFindIndex<T>(postsC, postsApiData, key);

      if (index !== -1) {
        postsC[index] = { ...postsC[index], ...postsApiData };
      }
    }
    return postsC;
  };

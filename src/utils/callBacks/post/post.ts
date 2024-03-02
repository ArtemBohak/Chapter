import { pageLimit } from "@/src/utils";
import { postDataEdit, dataFindIndex } from "../helpers";
// import { PostsRef } from "../callBacks.type";

export const postsCB =
  <T>(postsApiData: Array<T> | T, key: string) =>
  (posts: Array<T>) => {
    let postsC = [...posts];
    let index: number;

    if (Array.isArray(postsApiData)) {
      for (const postApiData of postsApiData) {
        index = dataFindIndex<T>(postsC, postApiData, key as keyof T);

        if (index !== -1) {
          postsC[index] = { ...postsC[index], ...postApiData };
        } else postsC = [...postsC, postApiData];
      }

      return postDataEdit<T>(postsC, pageLimit);
    } else {
      index = dataFindIndex<T>(postsC, postsApiData, key as keyof T);

      if (index !== -1) {
        postsC[index] = { ...postsC[index], ...postsApiData };
      }
    }
    return postsC;
  };

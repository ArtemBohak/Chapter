import { postDataEdit, dataFindIndex } from "../helpers";

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

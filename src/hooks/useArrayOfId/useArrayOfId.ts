import { useMemo } from "react";
import { type Data } from "@/src/pages/FeedPage/FeedPage.type";

const useArrayOfId = (id: string, data: string[] | Data) => {
  const isIncluded = useMemo(
    () =>
      data.some((i) => {
        if (typeof i === "object" && i.id) return i.id === id;
        return i === id;
      }),
    [data, id]
  );

  return [isIncluded];
};

export default useArrayOfId;

import { useMemo } from "react";
import { dataList } from "./useFindUserId.type";
import { useAppSelector } from "@/src/redux";

export const useFindUserId = (data: dataList = []) => {
  const { id } = useAppSelector((state) => state.userSlice.user);

  return [
    useMemo(
      () =>
        data.some((i) => {
          if (typeof i === "object" && i.id) return String(i.id) === String(id);
          return String(i) === String(id);
        }),
      [data, id]
    ),
  ];
};

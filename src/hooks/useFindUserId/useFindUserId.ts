import { useMemo } from "react";
import { dataList } from "./useFindUserId.type";
import { useAppSelector } from "@/src/redux";

export const useFindUserId = (data: dataList) => {
  const { id } = useAppSelector((state) => state.userSlice.user);
  const isIncluded = useMemo(() => {
    const dataList = data ? data : [];
    return dataList.some((i) => {
      if (typeof i === "object" && i.id) return i.id + "" === id + "";
      return i + "" === id + "";
    });
  }, [data, id]);

  return [isIncluded];
};

import { useMemo } from "react";

const useArrayOfId = (id: string, data: string[]) => {
  const isIncluded = useMemo(() => data.some((i) => i === id), [data, id]);

  return [isIncluded];
};

export default useArrayOfId;

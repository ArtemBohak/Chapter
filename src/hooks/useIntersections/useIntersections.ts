import { useEffect } from "react";

import { OptionsType, HandlerType } from "./useIntersections.type";
import { RefType } from "@/src/types";

const intersectionCB =
  (handler: HandlerType, nodeRef?: RefType) =>
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (nodeRef?.current) handler(entry, nodeRef?.current);
    });
  };

export const useRefIntersection = (
  handler: HandlerType,
  nodeRef?: RefType,
  { postsIsLoad, commentsIsShow, ...options }: OptionsType = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      intersectionCB(handler, nodeRef),
      options
    );

    if (nodeRef?.current) observer.observe(nodeRef?.current);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsIsShow, postsIsLoad, nodeRef, options]);
};

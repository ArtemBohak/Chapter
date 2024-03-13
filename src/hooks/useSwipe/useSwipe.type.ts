import { ModalProps } from "@/src/components/Modal/Modal.type";
import { Dispatch, SetStateAction } from "react";

export type UseSwipeProps = {
  setIsShown: Dispatch<SetStateAction<boolean>>;
} & Pick<
  ModalProps,
  "axis" | "touchDistinction" | "enableSwipeOnScreen" | "enableSwipe"
>;

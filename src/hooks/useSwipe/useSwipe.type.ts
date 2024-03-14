import { ModalProps } from "@/src/components/Modal/Modal.type";

export type UseSwipeProps = {
  leftSwipeCB?: () => void;
  rightSwipeCB?: () => void;
} & Pick<
  ModalProps,
  "axis" | "touchDistinction" | "enableSwipeOnScreen" | "enableSwipe"
>;

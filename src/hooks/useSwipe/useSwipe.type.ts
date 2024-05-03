import { ModalProps } from "@/src/components/Modals/Modal/Modal.type";
import { RefType } from "@/src/types";

export type UseSwipeProps = {
  nodeRef?: RefType;
  leftSwipeCB?: () => void;
  rightSwipeCB?: () => void;
} & Pick<
  ModalProps,
  "axis" | "touchDistinction" | "enableSwipeOnScreen" | "enableSwipe"
>;

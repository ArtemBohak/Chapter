import { ModalProps } from "@/src/components/Modals/Modal/Modal.type";
import { RefType } from "@/src/types";

export type UseSwipeProps = {
  leftSwipeCB?: () => void;
  rightSwipeCB?: () => void;
  nodeRef?: RefType;
} & Pick<
  ModalProps,
  "axis" | "touchDistinction" | "enableSwipeOnScreen" | "enableSwipe"
>;

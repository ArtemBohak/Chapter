import { ModalProps } from "../Modal.type";

export type UseSwipeProps = Pick<
  ModalProps,
  | "axis"
  | "setIsOpen"
  | "touchDistinction"
  | "enableSwipeOnScreen"
  | "enableSwipe"
  | "clearData"
>;

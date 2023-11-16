import { ModalProps } from "../Modal/Modal.type";

export type ModalWindowProps = Pick<
  ModalProps,
  "children" | "isOpen" | "setIsOpen"
>;

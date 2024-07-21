import { ModalProps } from "../Modals/Modal/Modal.type";

export type ModalWindowProps = Pick<
  ModalProps,
  "children" | "isOpen" | "setIsOpen"
>;

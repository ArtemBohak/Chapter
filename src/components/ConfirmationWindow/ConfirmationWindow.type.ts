import { ModalProps } from "../Modal/Modal.type";

export type ConfirmationWindowProps = {
  text: string;
  confirmText?: string;
  deniedText?: string;
  classNames?: string;
  isLoading?: boolean;
  fetch: () => void;
} & Pick<ModalProps, "isOpen" | "setIsOpen">;

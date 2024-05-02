import { ModalProps } from "../Modals/Modal/Modal.type";

export type ConfirmationWindowProps = {
  text: string;
  confirmText?: string;
  deniedText?: string;
  classNames?: string;
  isLoading?: boolean;
  fetch: () => Promise<void>;
} & Pick<ModalProps, "isOpen" | "setIsOpen">;

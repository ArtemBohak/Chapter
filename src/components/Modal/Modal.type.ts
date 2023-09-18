export type ModalProps = {
  children: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
  portal?: boolean;
  backdropClassName?: string;
  bodyClassName?: string;
};

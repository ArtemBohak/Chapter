export type NotificationProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  btnText: string;
  children: React.ReactElement;
};

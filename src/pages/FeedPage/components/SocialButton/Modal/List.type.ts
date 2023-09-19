import { Data } from "../SocialButton.type";

export type ListProps = {
  title: string;
  data: Data;
  setIsOpen: (isOpen: boolean) => void;
};

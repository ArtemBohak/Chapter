import { Data } from "../../FeedPage.type";

export type ListProps = {
  title: string;
  data: Data;
  setIsOpen: (isOpen: boolean) => void;
};

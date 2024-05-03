import { Dispatch, SetStateAction } from "react";

export type ContactUsProps = {
  active: boolean;
  visible: boolean;
  close: () => void;
  title?: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

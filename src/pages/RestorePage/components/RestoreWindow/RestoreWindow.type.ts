import { Dispatch, SetStateAction } from "react";

export type RestoreWindowProps = {
  setRestoringFormIsOpen: Dispatch<SetStateAction<boolean>>;
  token: string | undefined;
  email: string | undefined;
};

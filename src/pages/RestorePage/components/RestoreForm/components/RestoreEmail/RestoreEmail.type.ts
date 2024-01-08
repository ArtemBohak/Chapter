import { Dispatch, SetStateAction } from "react";

export type RestoreEmailProps = {
  email: string | undefined;
  setRestoreMsgIsShown: Dispatch<SetStateAction<boolean>>;
  setShowError: Dispatch<SetStateAction<boolean>>;
};

export type FormValues = { hash: string };

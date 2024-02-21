import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IProfileProviderProps {
  children: ReactNode;
}

type SetModal = Dispatch<SetStateAction<boolean>>;

export type ProfileContextType = {
  headerAddPostBtnIsDisabled: boolean;
  setHeaderAddPostBtnIsDisabled: SetModal;
};

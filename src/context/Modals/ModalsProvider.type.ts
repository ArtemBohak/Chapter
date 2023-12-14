import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IModalsProviderProps {
  children: ReactNode;
}

type SetModal = Dispatch<SetStateAction<boolean>>;

export type ModalsContextType = {
  headerAddPostBtnIsDisabled: boolean;
  setHeaderAddPostBtnIsDisabled: SetModal;
};

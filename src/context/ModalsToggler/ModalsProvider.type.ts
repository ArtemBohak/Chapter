import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IModalsProviderProps {
  children: ReactNode;
}

type SetModal = Dispatch<SetStateAction<boolean>>;

export type ModalsTogglerContextType = {
  headerAddPostBtnIsDisabled: boolean;
  setHeaderAddPostBtnIsDisabled: SetModal;
};

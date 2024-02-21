import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IProfileProviderProps {
  children: ReactNode;
}

type SetBoolean = Dispatch<SetStateAction<boolean>>;

export type ProfileContextType = {
  headerAddPostBtnIsDisabled: boolean;
  setHeaderAddPostBtnIsDisabled: SetBoolean;
  unreadMessage: boolean;
  setUnreadMessage: SetBoolean;
};
s;

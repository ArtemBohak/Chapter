import { Dispatch, SetStateAction } from "react";
import { CustomModalProps } from "../Modals/CustomModal/CustomModal.type";

export type MenuProps = Omit<CustomModalProps, "children"> & {
  setIsActiveMenu?: Dispatch<SetStateAction<boolean>>;
};

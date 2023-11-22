import { Dispatch, SetStateAction } from "react";
import { ModalProps } from "../Modal/Modal.type";

export type PostCreationProps = Pick<
  ModalProps,
  "portal" | "isOpen" | "setIsOpen"
>;

export type PostProps = {
  title: string;
  comment: string;
  image: string;
  setFormIsOpen: Dispatch<SetStateAction<boolean>>;
};

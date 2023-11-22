import { Dispatch, SetStateAction } from "react";

export type FormProps = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  setIsForm: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setComment: Dispatch<SetStateAction<string>>;
};

export type PostCreateValues = { title: string; comment: string };

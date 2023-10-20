import { Dispatch, SetStateAction } from "react";

export type ImageUploadProps = {
  setAvatarUrl: Dispatch<SetStateAction<string>>;
};

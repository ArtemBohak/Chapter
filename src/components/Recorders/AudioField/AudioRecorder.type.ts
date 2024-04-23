import { Dispatch, SetStateAction } from "react";

export type AudioRecorderProps = {
  iconSize?: number;
  setAudio: Dispatch<SetStateAction<string | null>>;
};

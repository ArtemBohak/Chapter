import { MouseEvent } from "react";

export type TextTaggingProps = {
  text: string;
  className: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  textClassName?: string;
};

import { Author } from "@/src/types";
import { MouseEvent } from "react";

export type TextTaggingProps = {
  text: string;
  className: string;
  textClassName?: string;
  replyTo?: Pick<Author, "id" | "nickName"> | null;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

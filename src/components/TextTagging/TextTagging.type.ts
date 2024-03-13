import { IAuthor } from "@/src/types";
import { MouseEvent } from "react";

export type TextTaggingProps = {
  text: string;
  className: string;
  textClassName?: string;
  linkClassName?: string;
  withTag?: boolean;
  replyTo?: Pick<IAuthor, "id" | "nickName"> | null;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

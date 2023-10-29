import { FileArgs } from "@/src/types";

export type Params = {
  public_id: string;
  timestamp: number;
  context?: string;
  folder?: string;
  eager?: string;
  overwrite?: boolean;
  allowed_formats?: string[];
} & Partial<FileArgs>;

export enum Path {
  AVATAR = "chapter/avatars",
  POSTS = "chapter/posts",
}

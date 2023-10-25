import { FileUploadArgs } from "@/src/types";

export type Params = { public_id: string; timestamp: number };

export type UploadParams = {
  context?: string;
  folder: string;
  eager: string;
  overwrite: boolean;
  allowed_formats?: string[];
} & Partial<FileUploadArgs> &
  Params;

export enum Path {
  AVATAR = "chapter/avatars",
  POSTS = "chapter/posts",
}

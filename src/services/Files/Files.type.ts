export type FileUploadArgs = {
  file: File | string;
  id: number;
  avatar: boolean;
  path?: string;
  format?: string;
  height?: number;
  width?: number;
  overwrite?: boolean;
  transform?: string;
  tags?: string[];
  radius?: number;
  formats?: string[] | [];
  alt?: string;
};

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

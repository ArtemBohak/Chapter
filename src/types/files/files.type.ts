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

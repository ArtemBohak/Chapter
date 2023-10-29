export type FileArgs = {
  file: File | string;
  id: number | string;
  avatar?: boolean;
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

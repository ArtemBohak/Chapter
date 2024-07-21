
export type ImageFieldProps = {
  btnVariant: "button" | "icon" | "book";
  setFile: (value: File | null) => void;
  setImage?: (value: string) => void;
  iconSize?: number;
  classNames?: string;
  isLoading?: boolean;
  error?: string | null;
};

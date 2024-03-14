export type IconButtonProps = {
  onHandleEdit: () => void;
  onHandleSave?: () => void;
  isLoading?: boolean;
  isEditing: boolean;
  classNames?: string;
};

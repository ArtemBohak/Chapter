import { Icon, IconEnum } from "@/src/components";
import { Dispatch, FC } from "react";
import styles from "../IconButtons.module.scss";

type CloseButtonProps = {
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

const CloseButton: FC<CloseButtonProps> = ({ setIsOpen, className }) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <button
      onClick={handleClose}
      className={className || styles["close-button"]}
    >
      {<Icon icon={IconEnum.Cross} />}
    </button>
  );
};

export default CloseButton;

import { createPortal } from "react-dom";
import { FC, MouseEvent, useEffect } from "react";
import { ModalProps } from "./Modal.type";

import styles from "./Modal.module.scss";

const Modal: FC<ModalProps> = ({ isOpen, setIsOpen, children }) => {
  useEffect(() => {
    const handlePressESC = (e: { code: string }) => {
      console.log(e.code);
      if (e.code === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handlePressESC);

    return () => {
      console.log(1);
      window.removeEventListener("keydown", handlePressESC);
    };
  }, [setIsOpen]);

  if (!isOpen) return null;
  const onHandleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return createPortal(
    <div
      onClick={onHandleClick}
      onKeyDown={handlePressESC}
      className={styles["modal-backdrop"]}
    >
      <div className={styles["modal"]}>{children}</div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;

import { createPortal } from "react-dom";
import { FC, MouseEvent, useEffect } from "react";

import cn from "classnames";

import { ModalProps } from "./Modal.type";
import styles from "./Modal.module.scss";

const Modal: FC<ModalProps> = ({
  setIsOpen,
  children,
  portal = false,
  backdropClassName,
  bodyClassName,
}) => {
  useEffect(() => {
    const handlePressESC = (e: { code: string }) => {
      if (e.code === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handlePressESC);

    return () => {
      window.removeEventListener("keydown", handlePressESC);
    };
  }, [setIsOpen]);

  const onHandleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const backDropClassNames = cn(styles["modal-backdrop"], backdropClassName);
  const bodyClassNames = cn(styles["modal-body"], bodyClassName);

  return portal ? (
    createPortal(
      <div
        onClick={onHandleClick}
        data-automation="clickDiv"
        className={backDropClassNames}
      >
        <div className={bodyClassNames}>{children}</div>
      </div>,
      document.getElementById("modal-root")!
    )
  ) : (
    <div
      onClick={onHandleClick}
      data-automation="clickDiv"
      className={backDropClassNames}
    >
      <div className={bodyClassNames}>{children}</div>
    </div>
  );
};

export default Modal;

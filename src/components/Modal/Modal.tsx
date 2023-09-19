import { createPortal } from "react-dom";
import { FC, MouseEvent, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import cn from "classnames";

import { ModalProps } from "./Modal.type";
import styles from "./Modal.module.scss";

const Modal: FC<ModalProps> = ({
  setIsOpen,
  isOpen,
  children,
  transitionTimeOut = 300,
  portal = false,
  backdropClassName,
  bodyClassName,
  transitionClassName,
}) => {
  const nodeRef = useRef(null);

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
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  const backDropClassNames = cn(styles["modal-backdrop"], backdropClassName);
  const bodyClassNames = cn(styles["modal-body"], bodyClassName);

  if (portal)
    return createPortal(
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpen}
        timeout={transitionTimeOut}
        classNames={{ ...transitionClassName }}
        mountOnEnter
        unmountOnExit
      >
        <div
          ref={nodeRef}
          className={backDropClassNames}
          onClick={onHandleClick}
          data-automation="elementClick"
        >
          <div className={bodyClassNames}>{children}</div>
        </div>
      </CSSTransition>,
      document.getElementById("modal-root")!
    );

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={transitionTimeOut}
      classNames={{ ...transitionClassName }}
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className={backDropClassNames}
        onClick={onHandleClick}
        data-automation="elementClick"
      >
        <div className={bodyClassNames}>{children}</div>
      </div>
    </CSSTransition>
  );
};

export default Modal;

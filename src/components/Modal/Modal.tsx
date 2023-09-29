import { createPortal } from "react-dom";
import { FC, MouseEvent, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import cn from "classnames";

import { ModalProps } from "./Modal.type";
import useSwipe from "./hooks/useSwipe";
import styles from "./Modal.module.scss";

const Modal: FC<ModalProps> = ({
  setIsOpen,
  isOpen,
  children,
  transitionClassName,
  transitionTimeOut = 0,
  portal = false,
  backdropClassName,
  bodyClassName,
  ...props
}) => {
  const nodeRef = useRef(null);
  useSwipe({ setIsOpen, ...props });

  useEffect(() => {
    const handlePressESC = (e: { code: string }) => {
      if (e.code === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handlePressESC);

    return () => {
      window.removeEventListener("keydown", handlePressESC);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  const backDropClassNames = cn(styles["backdrop"], backdropClassName);
  const bodyClassNames = cn(styles["body"], bodyClassName);

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
          data-automation="backDropClick"
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
      mountOnEnter
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className={backDropClassNames}
        onClick={onHandleClick}
        data-automation="backDropClick"
      >
        <div className={bodyClassNames}>{children}</div>
      </div>
    </CSSTransition>
  );
};

export default Modal;

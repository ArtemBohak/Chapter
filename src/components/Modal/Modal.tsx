import { createPortal } from "react-dom";
import { FC, MouseEvent, useEffect, useRef } from "react";
import cn from "classnames";

import { ModalProps } from "./Modal.type";
import { useSwipe } from "@/src/hooks";
import styles from "./Modal.module.scss";

import { Animation } from "@/src/components";

const Modal: FC<ModalProps> = ({
  setIsOpen,
  isOpen,
  children,
  transitionClassName,
  transitionTimeOut,
  portal = false,
  backdropClassName,
  bodyClassName,
  disableScroll = false,
  mountOnEnter = true,
  unmountOnExit = true,
  ...props
}) => {
  const nodeRef = useRef(null);
  useSwipe({ leftSwipeCB: () => setIsOpen(false), nodeRef, ...props });

  useEffect(() => {
    const handlePressESC = (e: { code: string }) => {
      if (e.code === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handlePressESC);

    return () => {
      window.removeEventListener("keydown", handlePressESC);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (disableScroll) {
      isOpen && document.body.classList.add(styles["no-scroll"]);
      !isOpen && document.body.classList.remove(styles["no-scroll"]);
    }

    return () => {
      document.body.classList.remove(styles["no-scroll"]);
    };
  }, [isOpen, disableScroll]);

  const onHandleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const backDropClassNames = cn(styles["backdrop"], backdropClassName);
  const bodyClassNames = cn(styles["body"], bodyClassName);

  if (portal)
    return createPortal(
      <Animation
        in={isOpen}
        nodeRef={nodeRef}
        timeout={transitionTimeOut}
        classNames={transitionClassName}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
      >
        <div
          className={backDropClassNames}
          onClick={onHandleClick}
          data-automation="backDropClick"
        >
          <div className={bodyClassNames} ref={nodeRef}>
            {children}
          </div>
        </div>
      </Animation>,
      document.getElementById("modal-root")!
    );

  return (
    <Animation
      nodeRef={nodeRef}
      in={isOpen}
      timeout={transitionTimeOut}
      classNames={transitionClassName}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      <div
        className={backDropClassNames}
        onClick={onHandleClick}
        data-automation="backDropClick"
      >
        <div className={bodyClassNames} ref={nodeRef}>
          {children}
        </div>
      </div>
    </Animation>
  );
};

export default Modal;

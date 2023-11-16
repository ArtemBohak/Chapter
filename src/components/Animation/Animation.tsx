import { FC } from "react";
import { CSSTransition } from "react-transition-group";

import { IAnimationProps } from "./Animation.type";
import styles from "./Animation.module.scss";

const Animation: FC<IAnimationProps> = ({
  children,
  isMount,
  nodeRef,
  timeout = 300,
  classNames,
  mountOnEnter = false,
  unmountOnExit = false,
}) => {
  const defaultClassNames = {
    enter: styles["animation-enter"],
    enterActive: styles["animation-enter-active"],
    exit: styles["animation-exit"],
    exitActive: styles["animation-exit-active"],
  };

  const transitionClassNames = classNames ? classNames : defaultClassNames;

  return (
    <CSSTransition
      in={isMount}
      nodeRef={nodeRef}
      timeout={timeout}
      classNames={transitionClassNames}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
    >
      {children}
    </CSSTransition>
  );
};

export default Animation;

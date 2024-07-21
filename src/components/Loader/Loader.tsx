import { FC, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";

import { ILoaderProps } from "./Loader.type";
import styles from "./Loader.module.scss";

import { Animation } from "@/src/components";

const Loader: FC<ILoaderProps> = ({
  height = 60,
  width = 100,
  isShown = false,
  timeTransition = 150,
  radius,
  color = "#FFBD5A",
  wrapperClassNames,
  loaderClassNames,
}) => {
  const nodeRef = useRef(null);
  const transitionClassNames = {
    enter: styles["loader-enter"],
    enterActive: styles["loader-enter-active"],
    exit: styles["loader-exit"],
    exitActive: styles["loader-exit-active"],
  };

  return (
    <Animation
      nodeRef={nodeRef}
      in={isShown}
      timeout={timeTransition}
      classNames={transitionClassNames}
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef} className={`${styles["loader"]} ${wrapperClassNames}`}>
        <ThreeDots
          ariaLabel="three-dots-loading"
          visible={isShown}
          height={height}
          width={width}
          wrapperClass={loaderClassNames}
          color={color}
          radius={radius}
        />
      </div>
    </Animation>
  );
};

export default Loader;

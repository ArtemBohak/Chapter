import { FC } from "react";
import cn from "classnames";

import { BlockAuthProps } from "./BlockAuth.type";

import styles from "./BlockAuth.module.scss";

const BlockAuth: FC<BlockAuthProps> = ({
  className,
  heading,
  showBottomText = false,
  children,
}) => {
  return (
    <section className={cn(styles["block-auth"], className)}>
      <div className={styles["block-auth__container"]}>
        <div className={styles["block-auth__body"]}>
          {heading && (
            <h1 className={styles["block-auth__heading"]}>{heading}</h1>
          )}
          {children}
        </div>
        {showBottomText ? (
          <div className={styles["block-auth__bottom-text"]}>
            <p>
              By clicking “Create account” above, you acknowledge that you have
              read and understood, and agree to Chapter's
              <a href="/">Terms & Conditions and Privacy Policy.</a>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BlockAuth;

import { FC } from "react";
import cn from "classnames";

import styles from "./BlockAuth.module.scss";

type Props = {
  className?: string;
  children: React.ReactNode;
  heading?: string;
  showBottomText?: boolean;
};

const BlockAuth: FC<Props> = ({
  className,
  heading,
  showBottomText = false,
  children,
}) => {
  return (
    <section className={cn(styles["block-auth"], className)}>
      <div className={cn(styles["block-auth__container"])}>
        <div className={cn(styles["block-auth__body"])}>
          {heading && (
            <h1 className={cn(styles["block-auth__heading"])}>{heading}</h1>
          )}
          {children}
        </div>
        {showBottomText ? (
          <div className={cn(styles["block-auth__bottom-text"])}>
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

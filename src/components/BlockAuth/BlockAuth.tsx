import { FC } from "react";
import cn from "classnames";

import styles from "./BlockAuth.module.scss";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  children: React.ReactNode;
  heading?: string;
  showBottomText?: boolean;
  typePageText?: string;
};

const BlockAuth: FC<Props> = ({
  className,
  heading,
  showBottomText = false,
  typePageText,
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
              By clicking {typePageText ? `"${typePageText}"` : null} above, you
              acknowledge that you have read and understood, and agree to
              Chapter's {''}
              <a href="/">Terms & Conditions and Privacy Policy.</a>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BlockAuth;

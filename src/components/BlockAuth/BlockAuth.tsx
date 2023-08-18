import { FC } from "react";
import cn from "classnames";

import styles from "./BlockAuth.module.scss";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
  children: React.ReactNode;
  heading?: string;
  showBottomText?: boolean;
  bottomTextCurrentPage?: string;
};

const BlockAuth: FC<Props> = ({
  className,
  heading,
  showBottomText = false,
  bottomTextCurrentPage,
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
              By clicking “{bottomTextCurrentPage}” above, you acknowledge that you have
              read and understood, and agree to Chapter's &nbsp;
              <Link to='#'>Terms & Conditions</Link> and <Link to='#'>Privacy Policy.</Link>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BlockAuth;

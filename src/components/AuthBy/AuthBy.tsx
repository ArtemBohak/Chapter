import { FC } from "react";

import { type AuthByProps } from "./AuthBy.type";
import styles from "./AuthBy.module.scss";

import { OAuth } from "../OAuth";

const AuthBy: FC<AuthByProps> = ({ className }) => (
  <div className={`${styles["auth-by"]} ${className}`}>
    <div className={styles["auth-by__container"]}>
      <OAuth oAuthVariant="google" googlePopupMode />
    </div>
  </div>
);

export default AuthBy;

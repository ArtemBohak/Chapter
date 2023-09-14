import { FC } from "react";

import { type AuthByProps } from "./AuthBy.type";
import styles from "./AuthBy.module.scss";

import { OAuthContainer } from "../OAuth";

const AuthBy: FC<AuthByProps> = ({ className }) => (
  <div className={`${styles["auth-by"]} ${className}`}>
    <OAuthContainer>
      <div className={styles["auth-by__container"]}></div>
    </OAuthContainer>
  </div>
);

export default AuthBy;

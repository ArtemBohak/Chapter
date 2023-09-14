import { FC } from "react";

import { type AuthByProps } from "./AuthBy.type";
import styles from "./AuthBy.module.scss";

import { OAuth, OAuthContainer } from "../OAuth";

const AuthBy: FC<AuthByProps> = ({ className }) => (
  <div className={`${styles["auth-by"]} ${className}`}>
    <OAuthContainer>
      <div className={styles["auth-by__container"]}>
        <OAuthContainer>
          <OAuth oAuthVariant="google" />
        </OAuthContainer>
      </div>
    </OAuthContainer>
  </div>
);

export default AuthBy;

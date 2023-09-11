import { FC } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import cn from "classnames";

import { type AuthByProps } from "./AuthBy.type";
import styles from "./AuthBy.module.scss";

const AuthBy: FC<AuthByProps> = ({ className }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className={cn(styles["auth-by"], className)}>
        <div className={styles["auth-by__container"]}></div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthBy;

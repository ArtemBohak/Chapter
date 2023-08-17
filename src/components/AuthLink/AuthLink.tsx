import { FC } from "react";
import { Link } from "react-router-dom";
import { type AuthLinkProps } from "@/src/components/AuthLink";
import styles from "./AuthLink.module.scss";

const AuthLink: FC<AuthLinkProps> = ({ textMsg, linkMsg, link }) => (
  <div className={styles["auth-link"]}>
    <div>
      <span className={styles["auth-link__text"]}>{textMsg}</span>
      &nbsp;
      <Link className={styles["auth-link__link"]} to={link}>
        {linkMsg}
      </Link>
    </div>
  </div>
);

export default AuthLink;

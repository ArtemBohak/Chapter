import { Link } from "react-router-dom";
import cn from "classnames";

import styles from "./AuthLink.module.scss";

const AuthLink = ({
  textMsg,
  linkMsg,
  link,
}: {
  textMsg: string;
  linkMsg: string;
  link: string;
}) => (
  <div className={cn(styles["auth-link"])}>
    <div>
      <span className={cn(styles["auth-link__text"])}>{textMsg}</span>
      &nbsp;
      <Link className={cn(styles["auth-link__link"])} to={link}>
        {linkMsg}
      </Link>
    </div>
  </div>
);

export default AuthLink;

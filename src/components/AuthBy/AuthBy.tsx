import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { type AuthByProps } from "@/src/components/AuthBy";
import styles from "./AuthBy.module.scss";

import { Icon } from "@/src/components/Icon";

const AuthBy: FC<AuthByProps> = ({
  socialLinks,
  text = "log in via",
  className,
}) => {
  return (
    <div className={cn(styles["auth-by"], className)}>
      <div className={styles["auth-by__text"]}>{text}</div>
      <ul className={styles["auth-by__list"]}>
        {socialLinks.map(({ link, icon, itemClassName }, index) => (
          <li key={index}>
            <Link
              to={link}
              className={cn(styles["auth-by__link"], itemClassName)}
            >
              <Icon icon={icon} size={24} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthBy;

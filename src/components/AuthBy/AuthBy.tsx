import { FC } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/src/components/Icon";
import { type AuthByProps } from "@/src/components/AuthBy";
import styles from "./AuthBy.module.scss";

const AuthBy: FC<AuthByProps> = ({ socialLinks, text = "log in via" }) => {
  return (
    <div className={styles["auth-by"]}>
      <div className={styles["auth-by__text"]}>{text}</div>
      <ul className={styles["auth-by__list"]}>
        {socialLinks.map((item, index) => (
          <li key={index}>
            <Link to={item.link} className={styles["auth-by__link"]}>
              <Icon icon={item.icon} size={24} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthBy;

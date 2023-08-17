import { Link } from "react-router-dom";
import cn from "classnames";

import { Icon } from "@/src/components/Icon";
import styles from "./AuthBy.module.scss";

type Props = {
  text?: string;
  socialLinks: {
    link: string;
    className?: string;
    icon: string;
  }[];
};

const AuthBy = ({ socialLinks, text = "log in via" }: Props) => {
  return (
    <div className={cn(styles["auth-by"])}>
      <div className={cn(styles["auth-by__text"])}>{text}</div>
      <ul className={cn(styles["auth-by__list"])}>
        {socialLinks.map((item, index) => (
          <li key={index}>
            <Link to={item.link} className={cn(styles["auth-by__link"])}>
              <Icon icon={item.icon} size={24} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthBy;

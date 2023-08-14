import { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./AuthBy.module.scss";

type Props = {
  text?: string;
  socialLinks: {
    link: string;
    className?: string;
    icon?: ReactElement | ReactNode;
  }[];
};

const AuthBy = ({ socialLinks, text = "log in via" }: Props) => {
  return (
    <div className={styles["auth-by"]}>
      <div className={styles["auth-by__text"]}>{text}</div>
      <ul className="flex gap-6 justify-center items-center">
        {socialLinks.map((item, index) => (
          <li key={index} className="rounded-full bg-red-600 w-[51px] h-[51px]">
            <Link to={item.link}></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthBy;

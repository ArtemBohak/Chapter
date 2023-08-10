import { Link } from "react-router-dom";
import styles from "../../LoginPage.module.scss";

const loginVia = () => {
  return (
    <div className={styles["loginVia-block"]}>
      <div className={styles["loginVia-text"]}>log in via</div>
      <ul className="flex gap-6 justify-center items-center">
        <li className="rounded-full bg-red-600 w-[51px] h-[51px]">
          <Link to="#"></Link>
        </li>
        <li className="rounded-full bg-green-600 w-[51px] h-[51px]">
          <Link to="#"></Link>
        </li>
        <li className="rounded-full bg-blue-600 w-[51px] h-[51px]">
          <Link to="#"></Link>
        </li>
      </ul>
    </div>
  );
};

export default loginVia;

import { FC } from "react";
import { useLocation } from "react-router-dom";

import styles from "./SearchPage.module.scss";

const SearchPage: FC = () => {
  const { state } = useLocation();
  console.log(state);

  return <div className={styles["search"]}>SEARCH</div>;
};

export default SearchPage;

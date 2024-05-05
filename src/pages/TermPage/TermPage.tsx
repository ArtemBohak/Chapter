import { FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./TermPage.module.scss";

import termsData from "./lib/termsData.json";

const TermPage: FC = () => {
  const { title } = useParams();

  const currentTitle = Number(title);

  if (isNaN(currentTitle)) throw new Error();

  const text = termsData[currentTitle - 1].text;

  return (
    <div className={styles["term"]}>
      <h2 className={styles["title"]}>title {title}</h2>
      <p className={styles["text"]}>{text}</p>
    </div>
  );
};

export default TermPage;

import { FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./TermPage.module.scss";

import termsData from "./lib/termsData.json";

const TermPage: FC = () => {
  const { term } = useParams();

  const currentTitle = Number(term);

  if (isNaN(currentTitle)) throw new Error();

  const title = termsData[currentTitle - 1].title;
  const text = termsData[currentTitle - 1].text;

  return (
    <div className={styles["term"]}>
      <h2 className={styles["title"]}>
        {currentTitle}. {title}
      </h2>
      {title.toLowerCase().includes("contact") ? (
        <p className={styles["text"]}>
          {text} <a href="mailto:support@chapter.com">support@chapter.com</a>
        </p>
      ) : (
        <p className={styles["text"]}>{text}</p>
      )}
    </div>
  );
};

export default TermPage;

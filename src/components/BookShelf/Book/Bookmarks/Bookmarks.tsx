import { FC } from "react";
import styles from "./Bookmarks.module.scss";

type bookmarks = {
  onEdit: boolean;
  setOnEdit: React.Dispatch<React.SetStateAction<boolean>>;
  activeBookToggler: () => void;
};

const Bookmarks: FC<bookmarks> = ({ onEdit, setOnEdit, activeBookToggler }) => {
  const onClose = () => {
    activeBookToggler();
    setOnEdit(false);
  };
  return (
    <>
      <ul className={styles["bookmarks-block"]}>
        <li onClick={() => onClose()} className={styles["bookmark"]}>
          <p className={styles["bookmark__text"]}>Back</p>
        </li>
        <li onClick={() => setOnEdit(!onEdit)} className={styles["bookmark"]}>
          <p className={styles["bookmark__text"]}>
            {onEdit ? "Finish" : "Edit"}
          </p>
        </li>
        <li className={styles["bookmark"]}>
          <p className={styles["bookmark__text"]}>Delete</p>
        </li>
      </ul>
    </>
  );
};

export default Bookmarks;

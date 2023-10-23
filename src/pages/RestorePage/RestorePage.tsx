import { FC, useState } from "react";
import { keyValue } from "@/src/utils";
import styles from "./RestorePage.module.scss";

import RestoreWindow from "./components/RestoreWindow/RestoreWindow";
import RestoreForm from "./components/RestoreForm/RestoreForm";

const RestorePage: FC = () => {
  const [restoringFormIsOpen, setRestoringFormIsOpen] = useState(false);
  const [restoringProvider, setRestoringProvider] = useState<
    keyValue.GOOGLE | keyValue.EMAIL | ""
  >("");
  return (
    <section className={styles["restore-page"]}>
      <div className={styles["restore-page-container"]}>
        {restoringFormIsOpen ? (
          <RestoreForm restoringProvider={restoringProvider} />
        ) : (
          <>
            <RestoreWindow
              setRestoringProvider={setRestoringProvider}
              setRestoringFormIsOpen={setRestoringFormIsOpen}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default RestorePage;

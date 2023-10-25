import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { links, keysValue } from "@/src/types";
import { getCookies } from "@/src/utils";
import styles from "./RestorePage.module.scss";

import RestoreWindow from "./components/RestoreWindow/RestoreWindow";
import RestoreForm from "./components/RestoreForm/RestoreForm";

const RestorePage: FC = () => {
  const [cEmail, cToken] = getCookies(
    keysValue.RESTORE_EMAIL,
    keysValue.RESTORE_TOKEN
  );

  const navigate = useNavigate();

  const [restoringFormIsOpen, setRestoringFormIsOpen] = useState(false);

  const [restoringProvider, setRestoringProvider] = useState<
    keysValue.GOOGLE | keysValue.EMAIL
  >();

  useEffect(() => {
    cEmail && setRestoringProvider(keysValue.EMAIL);
    cToken && setRestoringProvider(keysValue.GOOGLE);

    !cEmail && !cToken && navigate(links.LOG_IN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cEmail, cToken]);

  return (
    <section className={styles["restore-page"]}>
      <div className={styles["restore-page-container"]}>
        {restoringFormIsOpen ? (
          <RestoreForm restoringProvider={restoringProvider} email={cEmail} />
        ) : (
          <RestoreWindow
            setRestoringFormIsOpen={setRestoringFormIsOpen}
            email={cEmail}
            token={cToken}
          />
        )}
      </div>
    </section>
  );
};

export default RestorePage;

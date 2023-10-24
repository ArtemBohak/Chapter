import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCookies, keyValue, links } from "@/src/utils";
import styles from "./RestorePage.module.scss";

import RestoreWindow from "./components/RestoreWindow/RestoreWindow";
import RestoreForm from "./components/RestoreForm/RestoreForm";

const RestorePage: FC = () => {
  const [email, token] = getCookies(
    keyValue.RESTORE_EMAIL,
    keyValue.RESTORE_TOKEN
  );

  const navigate = useNavigate();

  const [restoringFormIsOpen, setRestoringFormIsOpen] = useState(false);

  const [restoringProvider, setRestoringProvider] = useState<
    keyValue.GOOGLE | keyValue.EMAIL
  >();

  useEffect(() => {
    email && setRestoringProvider(keyValue.EMAIL);
    token && setRestoringProvider(keyValue.GOOGLE);

    !email && !token && navigate(links.LOG_IN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, token]);

  return (
    <section className={styles["restore-page"]}>
      <div className={styles["restore-page-container"]}>
        {restoringFormIsOpen ? (
          <RestoreForm restoringProvider={restoringProvider} email={email} />
        ) : (
          <RestoreWindow
            setRestoringFormIsOpen={setRestoringFormIsOpen}
            email={email}
            token={token}
          />
        )}
      </div>
    </section>
  );
};

export default RestorePage;

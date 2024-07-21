import { FC, useState } from "react";

import { ProfileUpdateApi } from "../../utils/ProfileUpdateApi";
import { UiMessage } from "@/src/types";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./UserAccountDeletion.module.scss";
import { ConfirmationWindow } from "@/src/components";

const UserAccountDeletion: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModalIsShown, setConfirmModalIsShown] = useState(false);
  const setError = useErrorBoundary();

  const onDeleteAcc = async () => {
    const user = new ProfileUpdateApi(setIsLoading, setError);
    await user.deleteAccount();
  };
  return (
    <div className={styles["account-delete"]}>
      <h3 className={styles["account-delete__title"]}>
        Do you want to delete your account?
      </h3>
      <button
        onClick={() => setConfirmModalIsShown(true)}
        disabled={isLoading}
        className={styles["account-delete__button"]}
        data-automation="clickButton"
        aria-label="Open delete account confirmation menu"
      >
        Delete
      </button>
      <ConfirmationWindow
        isOpen={confirmModalIsShown}
        setIsOpen={setConfirmModalIsShown}
        text={UiMessage.DELETE}
        isLoading={isLoading}
        fetch={onDeleteAcc}
      />
    </div>
  );
};

export default UserAccountDeletion;

import { FC, useState } from "react";

import { ProfileUpdateApi } from "../../utils/ProfileUpdateApi";
import { useErrorBoundary } from "@/src/hooks";
import styles from "./UserAccountDeletion.module.scss";

const UserAccountDeletion: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setError = useErrorBoundary();

  const onHandleClick = async () => {
    const user = new ProfileUpdateApi(setIsLoading, setError);
    await user.deleteAccount();
  };
  return (
    <div className={styles["account-delete"]}>
      <h3 className={styles["account-delete__title"]}>
        Do you want to delete your account?
      </h3>
      <button
        onClick={onHandleClick}
        disabled={isLoading}
        className={styles["account-delete__button"]}
        data-automation="clickButton"
      >
        Delete
      </button>
    </div>
  );
};

export default UserAccountDeletion;

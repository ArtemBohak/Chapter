import { FC, useState } from "react";

import styles from "./UserAccountDeletion.module.scss";

const UserAccountDeletion: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const onHandleClick = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        console.log("clicked");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
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

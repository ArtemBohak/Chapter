import { BlockAuth } from "@/src/components";
import { FC } from "react";

import styles from "./PasswordChange.module.scss";
import PasswordChangeForm from "./components/PasswordChangeForm/PasswordChangeForm";

const PasswordChange: FC = () => {
  return (
    <BlockAuth
      heading="Create new password"
      showBottomText={true}
      typePageText="Restore password"
    >
      <div className={styles["password-change-wrapper"]}>
        <PasswordChangeForm />
      </div>
    </BlockAuth>
  );
};

export default PasswordChange;

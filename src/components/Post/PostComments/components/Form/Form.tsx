import { FC } from "react";

import { useAppSelector } from "@/src/redux";
import { FormProps } from "./Form.type";
import styles from "./Form.module.scss";

import { CommentsForm } from "./components";

const Form: FC<FormProps> = (props) => {
  const {
    user: { avatarUrl },
  } = useAppSelector((state) => state.userSlice);
  return (
    <div className={styles["form__content-wrapper"]}>
      <div className={styles["form__image"]}>
        <img src={avatarUrl} alt="user avatar" width={44} height={44} />
      </div>
      <div className={styles["form__comments-form-wrapper"]}>
        <CommentsForm {...props} />
      </div>
    </div>
  );
};

export default Form;

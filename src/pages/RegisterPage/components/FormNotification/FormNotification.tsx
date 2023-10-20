import { FC } from "react";

import { type FormNotificationProps } from "./FormNotification.type";
import { signUpCodeMessage } from "./constants";
import styles from "./FormNotification.module.scss";

const FormNotification: FC<FormNotificationProps> = ({
  message = signUpCodeMessage,
}) => <p className={styles["form-notification"]}>{message}</p>;

export default FormNotification;

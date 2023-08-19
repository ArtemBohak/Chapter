import { FC } from "react";
import cn from "classnames";
import { type FormNotificationProps } from "./form-notification.type";
import { signUpCodeMessage } from "./constants";
import styles from "./FormNotification.module.scss";

const FormNotification: FC<FormNotificationProps> = ({
  message = signUpCodeMessage,
  className,
  ...props
}) => (
  <p className={cn(styles["form-notification"], className)} {...props}>
    {message}
  </p>
);

export default FormNotification;

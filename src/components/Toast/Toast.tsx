import { FC } from "react";

import { ToastProps } from "./Toast.type";
import styles from "./Toast.module.scss";

import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import toast from "react-hot-toast";
import { useProfileContext } from "@/src/context";

const Toast: FC<ToastProps> = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  messageValue,
  classNames,
  toastId,
}) => {
  const { setNotifications } = useProfileContext();

  const onHandleClick = () => {
    toast.dismiss(toastId);
    setNotifications((state) => state.filter((el) => el.id !== id));
  };
  return (
    <div
      key={id}
      className={`${styles["toast"]} ${classNames}`}
      onClick={onHandleClick}
    >
      <div className={styles["toast__user-data"]}>
        <img
          src={avatarUrl ? avatarUrl : defaultUserAvatar}
          width={40}
          height={40}
        />
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <p className={styles["toast__message"]}>{messageValue}</p>
    </div>
  );
};

export default Toast;

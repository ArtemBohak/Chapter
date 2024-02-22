import { FC } from "react";
import { INotification } from "./Notification.type";

const Notification: FC<INotification> = ({ classNames }) => {
  return <div className={classNames}></div>;
};

export default Notification;

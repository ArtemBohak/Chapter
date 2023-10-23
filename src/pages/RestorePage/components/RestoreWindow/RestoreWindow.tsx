import { FC, useEffect, useState } from "react";

import { getCookie, keyValue, timer } from "@/src/utils";
import { RestoreButtonProps } from "../RestoreButton/RestoreButton.type";
import styles from "./RestoreWindow.module.scss";

import RestoreButton from "../RestoreButton/RestoreButton";

const RestoreWindow: FC<RestoreButtonProps> = ({
  setRestoringProvider,
  setRestoringFormIsOpen,
}) => {
  const timeValue = getCookie(keyValue.DELETED_ACCOUNT_TIME_STAMP);

  const deadLine = timeValue ? new Date(timeValue).getTime() : 0;
  const times = timer(deadLine);
  const [days, setDays] = useState(times.days);
  const [hours, setHours] = useState(times.hours);
  const [minutes, setMinutes] = useState(times.minutes);

  useEffect(() => {
    const timerId = setInterval(() => {
      const times = timer(deadLine);
      if (times.distance) {
        setDays(times.days);
        setHours(times.hours);
        setMinutes(times.minutes);
      }
      if (!times.distance) clearInterval(timerId);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [deadLine]);
  return (
    <div className={styles["restore-msg"]}>
      <h1>
        Your account has been deleted.
        <br /> Do you want to restore?
      </h1>
      <p>
        {days} {+days > 1 ? "Days" : "Day"} {hours}{" "}
        {+hours > 1 ? "Hours" : "Hour"} {minutes}{" "}
        {+minutes > 1 ? "Minutes" : "Minute"}
      </p>
      <RestoreButton
        setRestoringProvider={setRestoringProvider}
        setRestoringFormIsOpen={setRestoringFormIsOpen}
      />
    </div>
  );
};

export default RestoreWindow;

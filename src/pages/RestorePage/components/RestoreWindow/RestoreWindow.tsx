import { FC, useEffect, useState } from "react";

import { keysValue } from "@/src/types";
import { getCookies, timer } from "@/src/utils";

import styles from "./RestoreWindow.module.scss";

import RestoreButton from "./components/RestoreButton/RestoreButton";
import { RestoreWindowProps } from "./RestoreWindow.type";

const RestoreWindow: FC<RestoreWindowProps> = (props) => {
  const [cTimeValue] = getCookies(keysValue.DELETED_ACCOUNT_TIME_STAMP);

  const deadLine = cTimeValue ? new Date(cTimeValue).getTime() : 0;
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
      <RestoreButton {...props} />
    </div>
  );
};

export default RestoreWindow;

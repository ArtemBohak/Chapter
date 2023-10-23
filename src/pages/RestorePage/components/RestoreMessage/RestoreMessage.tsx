import { FC, useEffect, useState } from "react";
import { getCookie, keyValue, timer } from "@/src/utils";

const RestoreMessage: FC = () => {
  const timeValue = getCookie(keyValue.DELETED_ACCOUNT_TIME_STAMP);

  const deadLine = timeValue ? new Date(timeValue).getTime() : 0;
  const times = timer(deadLine);
  const [days, setDays] = useState(times.days);
  const [hours, setHours] = useState(times.hours);
  const [minutes, setMinutes] = useState(times.minutes);
  const [seconds, setSeconds] = useState(times.seconds);

  useEffect(() => {
    const timerId = setInterval(() => {
      const times = timer(deadLine);
      if (times.distance) {
        setDays(times.days);
        setHours(times.hours);
        setMinutes(times.minutes);
        setSeconds(times.seconds);
      }
      if (!times.distance) clearInterval(timerId);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [deadLine]);
  return (
    <>
      <p>Your account has been deleted. Do you want to restore?</p>
      <p>
        {days} {+days > 1 ? "Days" : "Day"} {hours}
        {+hours > 1 ? "Hours" : "Hour"} {minutes}{" "}
        {+minutes > 1 ? "Minutes" : "Minute"} {seconds}{" "}
        {+seconds > 1 ? "Seconds" : "Second"}
      </p>
    </>
  );
};

export default RestoreMessage;

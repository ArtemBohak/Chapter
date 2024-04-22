export const formatDate = (dateValue: Date | string | number) => {
  const date = new Date(dateValue);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getDate = (date: Date | string | number) => {
  const inDate = new Date(date);

  const delta = Date.now() - inDate.getTime();
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  const years = Math.floor(delta / year);
  const months = Math.floor(delta / month);
  const days = Math.floor(delta / day);
  const hours = Math.floor((delta % day) / hour);
  const minutes = Math.floor(((delta % day) % hour) / minute);

  //* Different ways of date view
  // const dateTime = inDate.toLocaleString("en-GB", {
  //   day: "2-digit",
  //   month: "short",
  // });

  // const hoursTime = inDate.toLocaleString("en-GB", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // if (years >= 1) return `${years}yr ago`;
  // if (years < 1 && months >= 1) return `${dateTime}.`;
  // if (months < 1 && days >= 1) return `${days}d ago`;
  // if (days < 1 && hours >= 1) return `${hours}h ago`;
  // if (hours < 1 && minutes > 30) return `${hoursTime}`;
  // if (minutes <= 30 && minutes > 1) return `${minutes}min ago`;
  //* --->

  if (!years && !months && !days && !hours && minutes <= 1)
    return "less than a minute ago";
  if (!years && !months && !days && !hours) return `${minutes}min ago`;
  if (!years && !months && !days && hours < 24) return `${hours}h ago`;
  return formatDate(date);
};

export const setDate = (dateValue: Date, value: number) => {
  const date = new Date(dateValue);
  date.setDate(date.getDate() + value);
  return date;
};

export const timer = (endTime: number) => {
  const now = new Date().getTime();
  const distance = endTime - now;

  const days = addLeadingZero(Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = addLeadingZero(
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = addLeadingZero(
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = addLeadingZero(Math.floor((distance % (1000 * 60)) / 1000));
  if (distance < 0)
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      distance: 0,
    };

  return { days, hours, minutes, seconds, distance };
};

function addLeadingZero(value: number) {
  return String(value).padStart(2, "0");
}

export const convertDate = (timestamp: Date | number | string) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year}   ${hours}:${minutes}`;
};

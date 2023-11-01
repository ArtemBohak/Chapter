export const formatDate = (dateValue: Date | string | number) => {
  const date = new Date(dateValue);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
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

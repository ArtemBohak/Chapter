export const formatDate = (date: Date) => {
  const delta = Date.now() - date.getTime();
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

  if (years >= 5) return years + " years";
  if (years > 0) return years + " year";
  if (months > 1) return months + " months";
  if (months > 0) return months + " month";
  if (days > 1) return days + " days";
  if (days > 0) return days + " day";
  if (hours > 1) return hours + " hours";
  if (hours > 0) return hours + " hour";
  if (minutes > 1) return minutes + " min";
  if (minutes > 0) return "1 min";
};

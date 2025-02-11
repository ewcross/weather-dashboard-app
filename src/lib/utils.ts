export const firstLetterCaps = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const getImageUrl = (code: string) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export const getRoundedTemp = (temp: number) => {
  const rounded = temp.toFixed(0);
  return rounded === "-0" ? "0" : rounded;
};

export const getDateString = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const dayOfMonth = date.getDate();
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
  const monthName = date.toLocaleString("en-US", { month: "long" });

  return `${dayOfWeek}, ${dayOfMonth} ${monthName}`;
};

export const getDayString = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleString("en-US", { weekday: "long" });

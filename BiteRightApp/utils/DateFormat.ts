export const formatDate = (date: Date | null) => {
  if (!date) return "";

  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${String(date.getFullYear())}`;
};

export const dateToISO = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

export const formatToDayMonthDay = (date: Date) => {
  if (!date) return "";

  return `${date.toLocaleDateString("en-ca", {
    weekday: "short",
  })}, ${date.toLocaleDateString("en-ca", {
    month: "short",
  })} ${date.getDate()}`;
};
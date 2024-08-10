export function getDateString(date: string): string {
  let dateObj = new Date(date);
  return (
    dateObj.getFullYear() +
    "/" +
    (dateObj.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    dateObj.getDate().toString().padStart(2, "0") +
    " " +
    dateObj.getHours().toString().padStart(2, "0") +
    ":" +
    dateObj.getMinutes().toString().padStart(2, "0")
  );
}

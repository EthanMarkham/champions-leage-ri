export function getDateFromUdiscTime(dateString: string) {
  // Split the date and time parts
  const [datePart, timePart] = dateString.split(" ");

  // Extract year, month, and day from the date part
  const [year, month, day] = datePart.split("-").map(Number);

  // Extract hours and minutes from the time part
  const hours = parseInt(timePart.slice(0, 2), 10);
  const minutes = parseInt(timePart.slice(2), 10);

  // Create the Date object
  const date = new Date(year, month - 1, day, hours, minutes);

  return date;
}

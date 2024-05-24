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

export function isCurrentMonthYear(targetDate: Date): boolean {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Months are 0-based in JavaScript

  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth(); // Months are 0-based in JavaScript

  return currentYear === targetYear && currentMonth === targetMonth;
}

export function dateToMonthYearDisplay(targetDate: Date) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", timeZone: "UTC" };
  return targetDate.toLocaleDateString(undefined, options);
}

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

function toEST(date: Date): Date {
  // Convert date to 'America/New_York' timezone and return a new Date object
  const options = { timeZone: "America/New_York", hour12: false };
  const estString = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day, year] = estString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

export function dateStarted(targetDate: Date): boolean {
  const currentDate = new Date();

  // Convert both dates to EST
  const estCurrentDate = toEST(currentDate);
  const estTargetDate = toEST(targetDate);

  const currentYear = estCurrentDate.getFullYear();
  const currentMonth = estCurrentDate.getMonth(); // Months are 0-based in JavaScript
  const targetYear = estTargetDate.getFullYear();
  const targetMonth = estTargetDate.getMonth(); // Keep months 0-based

  return currentYear < targetYear || (currentYear === targetYear && currentMonth >= targetMonth);
}

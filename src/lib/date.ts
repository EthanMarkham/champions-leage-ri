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

  const currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JavaScript, so add 1
  const currentYear = currentDate.getFullYear();

  const targetMonth = targetDate.getMonth() + 1; // Months are 0-based in JavaScript, so add 1
  const targetYear = targetDate.getFullYear();

  console.log(`Current Date: ${currentDate}`);
  console.log(`Current Month: ${currentMonth}, Current Year: ${currentYear}`);
  console.log(`Target Date: ${targetDate}`);
  console.log(`Target Month: ${targetMonth}, Target Year: ${targetYear}`);

  return currentMonth === targetMonth && currentYear === targetYear;
}

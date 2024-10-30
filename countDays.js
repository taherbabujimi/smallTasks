function calculateDaysBetween(start, end, skipDates) {
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const leapDaysInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysInWeek = 7;
  let skipWeekendPair = true;

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function incrementDate(day, month, year) {
    const monthDays = isLeapYear(year) ? leapDaysInMonth : daysInMonth;
    day += 1;

    if (day > monthDays[month]) {
      day = 1;
      month += 1;
    }
    if (month > 12) {
      month = 1;
      year += 1;
    }
    return { day, month, year };
  }

  function isDateInSkipDates(day, month, year) {
    return skipDates.some(
      (date) => date.day === day && date.month === month && date.year === year
    );
  }

  let daysCount = 0;
  let { day, month, year } = start;
  const endDate = `${end.day}-${end.month}-${end.year}`;
  let weekDayCounter = start.weekDay;

  console.log("Processing Dates:");
  while (`${day}-${month}-${year}` !== endDate) {
    const currentDate = `${day}-${month}-${year}`;

    if (isDateInSkipDates(day, month, year)) {
      console.log(`Skipping (specific date): ${currentDate}`);
    } else if (weekDayCounter === 5) {
      if (skipWeekendPair) {
        console.log(`Skipping (weekend): ${currentDate}`);
        ({ day, month, year } = incrementDate(day, month, year));
        weekDayCounter = (weekDayCounter + 1) % daysInWeek;
        console.log(`Skipping (weekend): ${day}-${month}-${year}`);
      } else {
        console.log(`Counting (alternate weekend Saturday): ${currentDate}`);
        daysCount += 1;

        ({ day, month, year } = incrementDate(day, month, year));
        weekDayCounter = (weekDayCounter + 1) % daysInWeek;
        const sundayDate = `${day}-${month}-${year}`;
        console.log(`Counting (alternate weekend Sunday): ${sundayDate}`);
        daysCount += 1;
      }
      skipWeekendPair = !skipWeekendPair;
    } else if (weekDayCounter !== 6) {
      daysCount += 1;
      console.log(`Counting: ${currentDate}`);
    }

    ({ day, month, year } = incrementDate(day, month, year));
    weekDayCounter = (weekDayCounter + 1) % daysInWeek;
  }

  return daysCount;
}

const startDate = { day: 1, month: 1, year: 2024, weekDay: 0 };
const endDate = { day: 31, month: 1, year: 2034 };
const skipDates = [
  { day: 15, month: 1, year: 2023 },
  { day: 20, month: 1, year: 2023 },
];

console.log(
  "Total Days Counted:",
  calculateDaysBetween(startDate, endDate, skipDates)
);

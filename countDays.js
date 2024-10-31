const startDateDay = 12;
const startDateMonth = 2;
const startDateYear = 2025;
const startDateDayName = "Mon";

const finishDateDay = 22;
const finishDateMonth = 8;
const finishDateYear = 2037;

let totalDays = 0;
let daysInWeek = 7;

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let weekIndex = weekdays.indexOf(startDateDayName);

let weekCounter = 0;

let skipDates = ["22/8/2024", "5/4/2024", "16/8/2024"];

if (startDateYear === finishDateYear && startDateMonth === finishDateMonth) {
  totalDays = finishDateDay - startDateDay;
} else {
  for (let i = startDateYear; i <= finishDateYear; i++) {
    let yearType;
    if (i % 400 === 0) {
      yearType = "leapYear";
    } else if (i % 100 === 0) {
      yearType = "normalYear";
    } else if (i % 4 === 0) {
      yearType = "leapYear";
    } else {
      yearType = "normalYear";
    }

    let startMonth = 1;
    if (i === startDateYear) {
      startMonth = startDateMonth;
    }

    let endMonth = 12;
    if (i === finishDateYear) {
      endMonth = finishDateMonth;
    }

    for (let j = startMonth; j <= endMonth; j++) {
      let remainingDays = 0;
      let calculatedDays = 0;
      let weekendsToSkip = 0;
      let daysInMonth;
      switch (j) {
        case 4:
        case 6:
        case 9:
        case 11:
          daysInMonth = 30;
          break;
        case 2:
          if (yearType === "leapYear") {
            daysInMonth = 29;
          } else {
            daysInMonth = 28;
          }
          break;
        default:
          daysInMonth = 31;
          break;
      }

      let weeksInMonth = Math.round(daysInMonth / 7);
      console.log(weeksInMonth);

      for (let k = 1; k <= weeksInMonth; k++) {
        if (weekCounter % 2 === 0) {
          totalDays += 5;
          calculatedDays += 5;
          weekendsToSkip += 2;

          console.log("Weekends to skip", weekendsToSkip);
        } else {
          totalDays += daysInWeek;
          calculatedDays += daysInWeek;
        }

        weekCounter++;
        console.log("Week Counter", weekCounter);
      }
      remainingDays = daysInMonth - calculatedDays - weekendsToSkip;
      totalDays += remainingDays;
      console.log("remaining days: ", remainingDays);
    }
  }
}

console.log(`Total Days: ${totalDays - skipDates.length}`);

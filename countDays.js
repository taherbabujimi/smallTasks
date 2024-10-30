const startDateDay = 12;
const startDateMonth = 2;
const startDateYear = 2024;
const startDateDayName = "Mon";

const finishDateDay = 22;
const finishDateMonth = 8;
const finishDateYear = 2024;

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

      let startDay = 1;
      if (i === startDateYear && j === startDateMonth) {
        startDay = startDateDay;
      }

      let endDay = daysInMonth;
      if (i === finishDateYear && j === finishDateMonth) {
        endDay = finishDateDay;
      }

      for (let k = startDay; k <= endDay; k++) {
        if (weekdays[weekIndex] === "Sat" || weekdays[weekIndex] === "Sun") {
          if (weekCounter % 2 === 0) {
            console.log(
              `Skipping weekend: ${weekdays[weekIndex]} on Date: ${k}/${j}/${i}`
            );
          } else {
            if (skipDates.includes(`${k}/${j}/${i}`)) {
              console.log(`Array date skipped: ${k}/${j}/${i}`);
            } else {
              console.log(
                `Day: ${weekdays[weekIndex]} on Date: ${k}/${j}/${i}`
              );
              totalDays++;
            }
          }
        } else {
          if (skipDates.includes(`${k}/${j}/${i}`)) {
            console.log(`Array date skipped: ${k}/${j}/${i}`);
          } else {
            console.log(`Day: ${weekdays[weekIndex]} on Date: ${k}/${j}/${i}`);
            totalDays++;
          }
        }

        if (weekIndex === daysInWeek - 1) {
          weekCounter++;
        }

        weekIndex = (weekIndex + 1) % daysInWeek;
      }
    }
  }
}

console.log(`Total Days: ${totalDays}`);

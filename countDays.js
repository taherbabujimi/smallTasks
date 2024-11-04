const startDateDay = 1;
const startDateMonth = 7;
const startDateYear = 2020;
const startDateDayName = "Mon";

const finishDateDay = 22;
const finishDateMonth = 9;
const finishDateYear = 2023;

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

      if (i === startDateYear && j === startDateMonth) {
        daysInMonth = daysInMonth - startDateDay;
      } else if (i === finishDateYear && j === finishDateMonth) {
        daysInMonth = finishDateDay;
      }

      console.log("days in month: ", daysInMonth);

      let fullWeeks = Math.floor(daysInMonth / 7);
      console.log("FullWeeks: ", fullWeeks);
      let extraDays = daysInMonth % 7;
      console.log("Extra days: ", extraDays);

      for (let k = 0; k < fullWeeks; k++) {
        totalDays += daysInWeek;
        // if (weekCounter % 2 === 0) {
        //   totalDays += 5;
        // } else {
        //   totalDays += daysInWeek;
        // }
        // weekCounter++;
      }

      if (extraDays > 0) {
        totalDays += weekCounter % 2 === 0 ? Math.min(extraDays, 5) : extraDays;
      }
      console.log("min:", Math.min(extraDays, 5));
      weekCounter++;
    }
  }
}

console.log(`Total Days: ${totalDays}`);

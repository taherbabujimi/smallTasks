const startDateDay = 12;
const startDateMonth = 2;
const startDateYear = 2024;

const finishDateDay = 22;
const finishDateMonth = 8;
const finishDateYear = 2034;

let totalDays = 0;

if (startDateYear === finishDateYear && startDateMonth === finishDateMonth) {
  totalDays = finishDateDay - startDateDay; // Simple subtraction
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

    let startMonth;
    let startDay;
    if (i === startDateYear) {
      startMonth = startDateMonth;
      startDay = startDateDay;
    } else {
      startMonth = 1;
      startDay = 1;
    }

    // Determine the ending month and day
    let endMonth;
    let endDay;
    if (i === finishDateYear) {
      endMonth = finishDateMonth;
      endDay = finishDateDay;
    } else {
      endMonth = 12;
      switch (endMonth) {
        case 4:
        case 6:
        case 9:
        case 11:
          endDay = 30;
          break;
        case 2:
          if (yearType === "leapYear") {
            endDay = 29;
          } else {
            endDay = 28;
          }
          break;
        default:
          endDay = 31;
          break;
      }
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
      if (j === startMonth) {
        totalDays += daysInMonth - startDay + 1;
      } else if (j === endMonth) {
        totalDays += endDay;
      } else {
        totalDays += daysInMonth;
      }
    }
  }
}

console.log(totalDays);

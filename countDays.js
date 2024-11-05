const startDateDay = 1;
const startDateMonth = 9;
const startDateYear = 2020;
const startDateDayName = "Tue";

const finishDateDay = 29;
const finishDateMonth = 1;
const finishDateYear = 2030;

let totalDays = 0;
let daysInWeek = 7;

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let weekIndex = weekdays.indexOf(startDateDayName);

let weekCounter = 1;

let skipDates = ["12/9/2020", "13/9/2020", "10/10/2020", "11/10/2020"];

let skippedDatesMap = new Set();

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
        daysInMonth = daysInMonth - startDateDay + 1;
      } else if (i === finishDateYear && j === finishDateMonth) {
        daysInMonth = finishDateDay;
      }

      let fullWeeks = Math.floor(daysInMonth / 7);
      let extraDays = daysInMonth % 7;

      for (let k = 0; k < fullWeeks; k++) {
        if (weekCounter % 2 === 0) {
          totalDays += 5;

          let saturdayDate = `${6 + 7 * k - weekIndex}/${j}/${i}`;
          let sundayDate = `${7 + 7 * k - weekIndex}/${j}/${i}`;

          skippedDatesMap.add(saturdayDate);
          skippedDatesMap.add(sundayDate);
        } else {
          totalDays += daysInWeek;
        }
        weekCounter++;
        weekIndex = (weekIndex + 7) % 7;
      }

      if (extraDays > 0) {
        for (let d = 1; d <= extraDays; d++) {
          if (weekCounter % 2 === 0) {
            if (d === 6) {
              skippedDatesMap.add(`${d}/${j}/${i}`);
            } else if (d === 7) {
              skippedDatesMap.add(`${d}/${j}/${i}`);
            }
            totalDays += Math.min(extraDays - d + 1, 5);
            break;
          } else {
            totalDays++;
          }
          weekCounter++;
          weekIndex = (weekIndex + 1) % 7;
        }
      }

      weekCounter++;

      for (let l = 0; l < skipDates.length; l++) {
        let skipDate = skipDates[l].split("/");
        let skipDay = parseInt(skipDate[0]);
        let skipMonth = parseInt(skipDate[1]);
        let skipYear = parseInt(skipDate[2]);

        let skipDateIdentifier = `${skipDay}/${skipMonth}/${skipYear}`;

        if (
          skipYear === i &&
          skipMonth === j &&
          skipDay >= 1 &&
          skipDay <= daysInMonth &&
          !skippedDatesMap.has(skipDateIdentifier)
        ) {
          totalDays -= 1;
          skippedDatesMap.add(skipDateIdentifier);
        }
      }
    }
  }
}

console.log(`Total Days: ${totalDays}`);

import moment from "moment";

export const _formatMoney = (
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ","
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
};

export const _monthList = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const _yearsPicker = Array.from(
  { length: new Date().getFullYear() + 1 - 2009 },
  (_, i) => String(2009 + i)
).reverse();

export const _isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const _timeToHours = time => {
  let array = time.split(":");
  return parseInt(array[0]) + parseFloat(array[1]) / 60;
};

export const _hoursToTime = time => {
  time = Math.abs(time);
  let minutes = time % 1;
  let hour = time - minutes;
  minutes = Math.round(minutes * 60);
  return ("00" + hour).slice(-2) + ":" + ("00" + minutes).slice(-2);
};

export const _dateDifference = (start, end) => {
  // Copy date objects so don't modify originals

  var s = new Date(start);
  var e = new Date(end);

  var addOneMoreDay = 0;
  if (s.getDay() == 0 || s.getDay() == 6) {
    addOneMoreDay = 1;
  }

  // Set time to midday to avoid dalight saving and browser quirks
  s.setHours(12, 0, 0, 0);
  e.setHours(12, 0, 0, 0);

  // Get the difference in whole days
  var totalDays = Math.round((e - s) / 8.64e7);

  // Get the difference in whole weeks
  var wholeWeeks = (totalDays / 7) | 0;

  // Estimate business days as number of whole weeks * 5
  var days = wholeWeeks * 5;

  // If not even number of weeks, calc remaining weekend days
  if (totalDays % 7) {
    s.setDate(s.getDate() + wholeWeeks * 7);

    while (s < e) {
      s.setDate(s.getDate() + 1);

      // If day isn't a Sunday or Saturday, add to business days
      if (s.getDay() != 0 && s.getDay() != 6) {
        ++days;
      }
    }
  }
  //var weekEndDays = totalDays - days + addOneMoreDay;
  //return weekEndDays;
  return days + addOneMoreDay;
};

export const _exportDays = (start, end) => {
  let stringDays = "";
  if (start === end) {
    stringDays = start;
  } else {
    s = new Date(start);
    e = new Date(end);
    for (let d = s; d <= e; d.setDate(d.getDate() + 1)) {
      +d == +e
        ? (stringDays += moment(d).format("MM/DD/YYYY"))
        : (stringDays += moment(d).format("MM/DD/YYYY") + ",");
    }
  }
  return stringDays;
};

export const _getOTime = (inTime, outTime, ductime) => {
  let start =
    parseInt(inTime.split(":")[0]) + parseFloat(inTime.split(":")[1]) / 60;
  let end =
    parseInt(outTime.split(":")[0]) + parseFloat(outTime.split(":")[1]) / 60;

  let workingTime = end - start - ductime;
  let workingTimeMinutes = workingTime % 1;
  let workingTimeHour = workingTime - workingTimeMinutes;
  workingTimeMinutes = Math.round(workingTimeMinutes * 60);
  let timeMod = workingTimeMinutes % 15;
  workingTimeMinutes = workingTimeMinutes - timeMod;

  return (
    ("00" + workingTimeHour).slice(-2) +
    ":" +
    ("00" + workingTimeMinutes).slice(-2)
  );
};

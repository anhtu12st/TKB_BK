// Get Subject of this week
// Return an array with FULL detail about the subjects in this week
const getSubjectOfThisWeek = (data, week) => {
  const tkb = data["tkb"];
  return tkb.filter((item) => item["tuan_hoc"].includes(week));
};

// Get Subject at DATE
// Return an array with FULL detail about the subjects at DATE
// Need 2 argument (the week and the day[0-6])
export const getSubjectOfDate = (data, week, day) => {
  const thisWeek = getSubjectOfThisWeek(data, week);
  return thisWeek.filter((item) => day === item["thu1"]);
};

// Get WEEK and DAY
// Auto return the week and the day from today (the day later start at 0)
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

export const getWeekAndDay = (numDate = 0) => {
  const theDate = new Date();
  theDate.setDate(new Date().getDate() + numDate);

  // var d = new Date("2019-04-25T03:43:38.000+0000");
  // var theDate = new Date(d);
  // theDate.setDate(d.getDate() + numDate);

  const day = theDate.getDay() === 0 ? 8 : theDate.getDay() + 1;
  const week = theDate.getWeek();
  const date = theDate.getDate();
  const month = theDate.getMonth() + 1;
  return { day, week, date, month };
};

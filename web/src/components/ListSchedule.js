import React, { useContext, useState } from "react";
import Schedule from "./Schedule";
import { AuthContext } from "../context/AuthContext";
import { getSubjectOfDate, getWeekAndDay } from "../functions/getSubject";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

function ListSchedule() {
  const { data } = useContext(AuthContext);
  const { currentUser, tkb } = data;
  const [numDate, setNumDate] = useState(0);

  const dayName = {
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
    8: "Sunday",
  };

  let date1 = 0,
    day1 = 0,
    week1 = 0,
    month1 = 0;
  let subjects = null;
  if (currentUser) {
    const { week, day, date, month } = getWeekAndDay(numDate);
    date1 = date;
    day1 = day;
    week1 = week;
    month1 = month;
    subjects = getSubjectOfDate(tkb, week, day);
  }

  const handleClickPre = () => {
    setNumDate((preNumDate) => preNumDate - 1);
  };

  const handleClickNext = () => {
    setNumDate((preNumDate) => preNumDate + 1);
  };

  return (
    <div className="listSchedule">
      <div className="timeStampTopContainer">
        <Button onClick={handleClickPre} variant="contained" color="primary">
          <NavigateBeforeIcon />
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="timeStampTop"
        >
          <div>Week: {week1}</div>
          {numDate === 0 ? (
            <div>
              Today: {date1}-{month1}
            </div>
          ) : (
            <div>
              {dayName[day1]}: {date1}-{month1}
            </div>
          )}
        </div>
        <Button onClick={handleClickNext} variant="contained" color="primary">
          <NavigateNextIcon />
        </Button>
      </div>
      {currentUser && subjects.length
        ? subjects.map((subject) => (
            <Schedule key={subject["ma_mh"]} subject={subject} />
          ))
        : null}
    </div>
  );
}

export default ListSchedule;

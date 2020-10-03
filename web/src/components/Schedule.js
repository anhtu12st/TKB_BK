import React from "react";

function Schedule({ subject }) {
  const { ten_mh, giobd, giokt, phong1 } = subject;
  return (
    <div className="schedule">
      <div className="nameClass">{ten_mh}</div>
      <div className="timeStamp">
        <div>
          {giobd} - {giokt}
        </div>
        <div>{phong1}</div>
      </div>
    </div>
  );
}

export default Schedule;

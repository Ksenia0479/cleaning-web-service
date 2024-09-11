import React from "react";

// utils
import { formatDate, formatTime } from "utils";

// styles
import "./orders-item-date.css";

export default ({ date, time }) => {
  return (
    <div className="order__date">
      <div>{formatDate(date)}</div>
      <div>{formatTime(time)}</div>
    </div>
  );
};

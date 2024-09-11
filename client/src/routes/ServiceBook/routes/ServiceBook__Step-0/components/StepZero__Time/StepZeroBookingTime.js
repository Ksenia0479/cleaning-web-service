import React from "react";

// components Time
import { TimeHeader, TimePicker } from "./components";

// styles
import "./step-zero-time.css";

export default () => {
  return (
    <fieldset className="fieldset__booking-time">
      <TimeHeader />
      <TimePicker />
    </fieldset>
  );
};

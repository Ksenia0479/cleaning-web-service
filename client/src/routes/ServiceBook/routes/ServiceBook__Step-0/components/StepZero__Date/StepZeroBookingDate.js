import React from "react";

// components
import { Fieldset } from "components";

// components - Date
import { DateHeader, DatePicker } from "./components";

// utils
import { disableUnavailableDates } from "utils";

// styles
import "./step-zero-date.css";

export default () => {
  return (
    <Fieldset className="section__booking-date background-white">
      <DateHeader />
      <DatePicker disableDates={disableUnavailableDates} />
    </Fieldset>
  );
};

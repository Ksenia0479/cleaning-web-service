import React from "react";

// components
import { Fieldset } from "components";

// components - Frequency
import { FrequencyHeader, FrequencyTypes } from "./components";

// styles
import "./step-zero-frequency.css";

export default ({ options: { data } }) => {
  return (
    <Fieldset className="section__booking-frequency">
      <FrequencyHeader />
      <FrequencyTypes options={data} />
    </Fieldset>
  );
};

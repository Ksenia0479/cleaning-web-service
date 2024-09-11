import React from "react";

// components
import { Fieldset } from "components";

// components - Services
import { ServicesHeader, ServicesOptions } from "./components";

// styles
import "./step-zero-services.css";

export default ({ options }) => {
  return (
    <Fieldset className="fieldset__booking-services background-white">
      <ServicesHeader />
      <ServicesOptions options={options} />
    </Fieldset>
  );
};

import React from "react";

// components
import { Fieldset, Legend } from "components";

// fields
import { AddressFormSection } from "fields";

// styles
import "./step-two-address.css";

export default () => {
  return (
    <Fieldset className="fieldset__booking-address">
      <Legend>What's the address of your home (office)?</Legend>
      <AddressFormSection />
    </Fieldset>
  );
};

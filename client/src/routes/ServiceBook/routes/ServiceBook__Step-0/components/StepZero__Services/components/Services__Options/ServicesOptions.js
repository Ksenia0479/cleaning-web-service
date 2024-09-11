import React from "react";

// components
import { Row } from "components";

// fields
import { StepZeroServicesFields } from "../../../../fields";

export default ({ options }) => {
  return (
    <Row>
      <div className="booking-services__box">
        <StepZeroServicesFields name="services" options={options} />
      </div>
    </Row>
  );
};

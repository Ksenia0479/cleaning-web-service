import React from "react";

// fields
import { StepZeroFrequencyField } from "../../../../../../fields";

// styles
import "./types-button.css";

export default ({ onFrequencyButtonClick, label, buttonName }) => {
  return (
    <div className="booking-frequency__btn">
      <StepZeroFrequencyField
        onFrequencyButtonClick={onFrequencyButtonClick}
        buttonLabel={label}
        buttonName={buttonName}
      />
    </div>
  );
};

import React, { useState } from "react";

// third-party libs
import classNames from "classnames";
import _ from "lodash";

// components
import { Row } from "components";

// components - Types
import {
  TypesBox,
  TypesItem,
  TypeTitle,
  TypeAdvantages,
  TypeButton
} from "./components";

// styles
import "../../styles/frequency-types.css";

export default ({ options }) => {
  const [frequencyType, setFrequencyType] = useState("");

  const onFrequencyButtonClick = label => {
    setFrequencyType(label);
  };

  return (
    <Row>
      <TypesBox>
        {_.map(options, ({ label }, index) => {
          const bookingFrequencyBoxClasses = classNames({
            "booking-frequency__box-item": true,
            box__selected: frequencyType === label
          });
          const buttonName = frequencyType === label ? "Selected" : "Select";

          return (
            <TypesItem key={index} className={bookingFrequencyBoxClasses}>
              <TypeTitle label={label} />
              <TypeAdvantages />
              <TypeButton
                onFrequencyButtonClick={onFrequencyButtonClick}
                label={label}
                buttonName={buttonName}
              />
            </TypesItem>
          );
        })}
      </TypesBox>
    </Row>
  );
};

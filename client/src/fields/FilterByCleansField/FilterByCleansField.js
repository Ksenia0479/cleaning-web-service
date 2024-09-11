import React from "react";
import { Field } from "redux-form";

// components
import { Input } from "components";

export default () => {
  const rangeValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 60, 80, 120];
  return (
    <Field
      name="cleans.value"
      type="range"
      parse={value => Number(value)}
      min={rangeValues[0]}
      max={rangeValues[rangeValues.length - 1]}
      className="slider"
      component={Input}
      rangeValues={rangeValues}
    />
  );
};

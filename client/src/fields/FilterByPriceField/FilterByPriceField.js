import React from "react";
import { Field } from "redux-form";

// components
import { Input } from "components";

export default () => {
  const rangeValues = [0, 10, 20, 30, 50, 100, 200, 300, 600, 800, 1200];
  return (
    <Field
      name="price.value"
      type="range"
      min={rangeValues[0]}
      parse={value => Number(value)}
      max={rangeValues[rangeValues.length - 1]}
      className="slider"
      component={Input}
      rangeValues={rangeValues}
    />
  );
};

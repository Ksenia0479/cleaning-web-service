import React from "react";
import { Field } from "redux-form";

// components
import { Button } from "components";

const ButtonField = ({
  input,
  meta,
  buttonLabel,
  buttonName,
  onFrequencyButtonClick,
  ...custom
}) => {
  !meta.visited &&
    meta.initial &&
    meta.initial.label === buttonLabel &&
    onFrequencyButtonClick(buttonLabel);

  return (
    <Button
      {...input}
      {...custom}
      meta={meta}
      name={buttonLabel}
      value={buttonName}
      onClick={() => {
        input.onChange(() => {
          input.value = { label: buttonLabel, value: true };
          onFrequencyButtonClick(buttonLabel);
        });
      }}
      onBlur={() => {
        input.onBlur((input.value = { label: buttonLabel, value: true }));
      }}
    />
  );
};

export default ({ buttonLabel, buttonName, onFrequencyButtonClick }) => {
  return (
    <Field
      name="frequency"
      buttonLabel={buttonLabel}
      buttonName={buttonName}
      className="btn-ghost"
      onFrequencyButtonClick={onFrequencyButtonClick}
      component={ButtonField}
    />
  );
};

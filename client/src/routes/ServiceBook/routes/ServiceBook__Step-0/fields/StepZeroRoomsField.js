import React from "react";
import { Field } from "redux-form";

// components
import { Select } from "components";

export default ({ name, options, ...custom }) => {
  return (
    <Field
      name={name}
      component={Select}
      options={options}
      placeholder="Select at least one service *"
      {...custom}
    />
  );
};

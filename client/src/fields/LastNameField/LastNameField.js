import React from "react";
import { Field } from "redux-form";

// components
import { Input } from "components";

export default () => {
  return (
    <Field
      name="lastName"
      type="text"
      component={Input}
      label="Last Name"
      placeholder="Enter last name"
    />
  );
};

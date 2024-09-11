import React from "react";
import { Field } from "redux-form";

// components
import { Input } from "components";

export default () => {
  return (
    <Field
      name="firstName"
      type="text"
      component={Input}
      label="First Name"
      placeholder="Enter first name"
    />
  );
};

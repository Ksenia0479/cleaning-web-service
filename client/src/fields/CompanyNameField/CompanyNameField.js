import React from "react";
import { Field } from "redux-form";

// components
import { Input } from "components";

export default () => {
  return (
    <Field
      name="companyName"
      type="text"
      component={Input}
      label="Company name"
      placeholder="Enter company name"
    />
  );
};

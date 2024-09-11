import React from "react";
import { Field } from "redux-form";

// components
import { Input } from "components";

export default () => {
  return (
    <Field
      name="confirmPassword"
      type="password"
      component={Input}
      label="Confirm Password"
      placeholder="Confirm password"
    />
  );
};

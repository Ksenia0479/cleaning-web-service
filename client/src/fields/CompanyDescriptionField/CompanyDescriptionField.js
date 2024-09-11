import React from "react";
import { Field } from "redux-form";

// components
import { Textarea } from "components";

export default () => {
  return (
    <Field
      name="companyDescription"
      type="text"
      component={Textarea}
      label="Description"
      placeholder="Provide more details about your company"
    />
  );
};

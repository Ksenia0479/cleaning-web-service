import React from "react";
import { Field, FormSection } from "redux-form";

// components
import { Textarea, Input } from "components";

export default () => {
  return (
    <FormSection name="review">
      <Field
        name="header"
        type="text"
        component={Input}
        placeholder="Headline or summary for your review"
      />
      <Field
        name="description"
        component={Textarea}
        placeholder="Write your review here"
      />
    </FormSection>
  );
};

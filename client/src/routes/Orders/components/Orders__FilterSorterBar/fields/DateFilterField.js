import React from "react";
import { Field } from "redux-form";

// components
import { SelectMenu } from "components";

const dateOptions = [
  { label: "Coming orders", value: "asc" },
  { label: "Future orders", value: "desc" }
];

export default () => {
  return (
    <Field
      name="date"
      component={SelectMenu}
      type="sorter"
      options={dateOptions}
      className="order-filters__order-date"
    />
  );
};

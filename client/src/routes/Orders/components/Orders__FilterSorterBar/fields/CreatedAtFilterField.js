import React from "react";
import { Field } from "redux-form";

// components
import { SelectMenu } from "components";

const createdAtOptions = [
  { label: "Last created", value: "asc" },
  { label: "New created", value: "desc" }
];

export default () => {
  return (
    <Field
      name="createdAt"
      component={SelectMenu}
      type="sorter"
      options={createdAtOptions}
      className="order-filters__order-details"
    />
  );
};

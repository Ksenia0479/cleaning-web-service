import React from "react";
import { Field } from "redux-form";

// components
import { SelectMenu } from "components";

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Denied", value: "denied" }
];

export default () => {
  return (
    <Field
      name="processed.status"
      component={SelectMenu}
      type="filter"
      options={statusOptions}
      className="order-filters__order-status"
    />
  );
};

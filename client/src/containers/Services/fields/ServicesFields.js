import React from "react";
import { Field } from "redux-form";

// components
import { Select, Input } from "components";

// styles
import "./services-fields.css";

export default ({ name, options }) => {
  return (
    <div className="services__fields">
      <Field
        name={`${name}`}
        component={Select}
        className="field__select"
        options={options}
      />
      <Field
        name={`${name}.value`}
        type="number"
        component={Input}
        placeholder="Type value"
      />
    </div>
  );
};

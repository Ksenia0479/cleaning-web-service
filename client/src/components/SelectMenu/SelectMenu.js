import React from "react";
import _ from "lodash";

// styles
import "./select.css";

export default ({ input, type, meta, options, ...custom }) => {
  return (
    <select {...input} {...custom}>
      {type === "filter" && <option value="">None</option>}
      {_.map(options, ({ value, label }, index) => {
        return (
          <option key={index} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

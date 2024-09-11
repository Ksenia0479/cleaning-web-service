import React from "react";
import Select from "react-select";
import classNames from "classnames";

// components
import { FormErrorHandler } from "components";

// styles
import "./select.css";

export default ({ input, meta: { touched, error }, options, ...custom }) => {
  const selectClasses = classNames({
    error: touched && error
  });

  return (
    <div className="form__select-container">
      {touched && error && <FormErrorHandler error={error} />}
      <Select
        {...input}
        {...custom}
        options={options}
        onChange={value => {
          input.onChange(value);
        }}
        onBlur={() => input.onBlur(input.value)}
        className={selectClasses}
      />
    </div>
  );
};

// isMulti

import React, { Fragment } from "react";
import classNames from "classnames";
import _ from "lodash";

// components
import { FormErrorHandler } from "components";

// validatedForms
import validatedForms from "store/validators/validatedForms";

// styles
import "./input.css";

export default ({
  input,
  type,
  id,
  meta: { touched, error, form },
  className = "",
  shouldBeValidated,
  rangeValues = [],
  ...custom
}) => {
  const inputBoxClasses = classNames({
    form__input: type === "text" || type === "number" || type === "password",
    "form__input-range": type === "range",
    "form__input-radio": type === "radio",
    success: touched && _.includes(validatedForms, form),
    error: touched && error,
    [className]: true
  });

  const inputClasses = classNames({
    input__icon: true
  });

  return (
    <div className="form__input-container">
      {touched && error && <FormErrorHandler error={error} />}

      <div className={inputBoxClasses}>
        {(type === "text" || type === "number" || type === "password") && (
          <input {...input} {...custom} type={type} className={inputClasses} />
        )}

        {type === "range" && (
          <Fragment>
            <span>{input.value}</span>
            <input
              {...input}
              {...custom}
              type={type}
              className={inputClasses}
              step="1"
              list="range-list"
            />
            <datalist id="range-list">
              {_.map(rangeValues, (value, index) => {
                return <option key={index} value={value} />;
              })}
            </datalist>
          </Fragment>
        )}

        {type === "radio" && (
          <Fragment>
            <input
              {...input}
              {...custom}
              id={id}
              type={type}
              className={inputClasses}
            />
            <label htmlFor={id}>{custom.label}</label>
          </Fragment>
        )}
      </div>
    </div>
  );
};

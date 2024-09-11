import React, { Fragment } from "react";
import { Field } from "redux-form";
import { KeyboardTimePicker } from "@material-ui/pickers";

// components
import { FormErrorHandler } from "components";

const TimeField = ({ input, meta: { touched, error } }) => {
  return (
    <Fragment>
      {touched && error && <FormErrorHandler error={error} />}
      <KeyboardTimePicker
        {...input}
        ampm={true}
        autoOk
        variant="static"
        error={touched && error}
        helperText={touched && error}
        value={!input.value ? null : input.value}
        onChange={value => {
          return input.onChange(value);
        }}
      />
    </Fragment>
  );
};

export default () => {
  return <Field name="time" component={TimeField} />;
};

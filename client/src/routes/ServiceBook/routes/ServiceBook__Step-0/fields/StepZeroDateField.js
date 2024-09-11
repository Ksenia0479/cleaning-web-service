import React, { Fragment } from "react";
import { Field } from "redux-form";
import { KeyboardDatePicker } from "@material-ui/pickers";

// components
import { FormErrorHandler } from "components";

const DatePicker = ({ input, meta: { error, touched }, custom }) => {
  return (
    <Fragment>
      {touched && error && <FormErrorHandler error={error} />}
      <KeyboardDatePicker
        {...input}
        {...custom}
        disablePast
        disableToolbar
        variant="static"
        orientation="portrait"
        value={!input.value ? null : new Date(input.value)}
        onChange={value => {
          return input.onChange(value);
        }}
      />
    </Fragment>
  );
};

export default ({ disableUnavailableDates }) => {
  return (
    <Field
      name="date"
      component={DatePicker}
      shouldDisableDate={disableUnavailableDates}
    />
  );
};

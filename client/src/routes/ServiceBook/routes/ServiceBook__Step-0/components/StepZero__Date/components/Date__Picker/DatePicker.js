import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// components
import { Row } from "components";

// fields
import { StepZeroDateField } from "../../../../fields";

export default ({ disableDates }) => {
  return (
    <Row>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StepZeroDateField disableUnavailableDates={disableDates} />
      </MuiPickersUtilsProvider>
    </Row>
  );
};

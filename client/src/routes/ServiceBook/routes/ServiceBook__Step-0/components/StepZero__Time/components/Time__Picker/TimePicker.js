import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// components
import { Row } from "components";

// fields
import { StepZeroTimeField } from "../../../../fields";

export default () => {
  return (
    <Row>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StepZeroTimeField />
      </MuiPickersUtilsProvider>
    </Row>
  );
};

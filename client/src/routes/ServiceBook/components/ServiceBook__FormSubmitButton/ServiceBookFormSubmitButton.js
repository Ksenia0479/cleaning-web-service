import React from "react";

// components
import { Row, Button, Fieldset } from "components";

// styles
import "./service-book-form-submit-button.css";

export default () => {
  return (
    <Fieldset className="fieldset__booking-buttons background-white">
      <Row>
        <Button type="submit" name="Next" value="Next" className="btn-action" />
      </Row>
    </Fieldset>
  );
};

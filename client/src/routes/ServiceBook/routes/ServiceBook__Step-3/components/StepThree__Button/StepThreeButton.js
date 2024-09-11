import React from "react";

// components
import { Row, Button } from "components";

export default ({ onClick }) => {
  return (
    <Row>
      <Button
        className="btn-action"
        onClick={onClick}
        value="Finish your booking"
      />
    </Row>
  );
};

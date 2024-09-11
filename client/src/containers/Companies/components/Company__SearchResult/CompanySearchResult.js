import React from "react";

// components
import { Row, Logo, Button } from "components";

// styles
import "./company-search-result.css";

export default ({ companyName, avatar, _id, onProceedToBookingClick }) => {
  return (
    <div className="search-result__box">
      <Row>
        <div className="box__item label">Selected Cleaner</div>
        <div className="box__item selected-cleaner">
          <Logo logo={avatar} to={`/companies?id=${_id}`} alt="avatar" />
          <div>{companyName}&nbsp;</div>
        </div>
        <div className="box__item">
          <Button
            className="action"
            value="Proceed to booking"
            onClick={onProceedToBookingClick}
          />
        </div>
      </Row>
    </div>
  );
};

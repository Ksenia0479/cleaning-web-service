import React from "react";
import { Link } from "react-router-dom";

export default ({ stepTwoClasses }) => {
  return (
    <div className={`steps__box-step ${stepTwoClasses} `}>
      <Link to="/booking/step-two">
        <div className="box-step__count">
          <i className="ion-ios-checkmark"></i>
          <div>2</div>
        </div>
        <div>Your details</div>
      </Link>
    </div>
  );
};

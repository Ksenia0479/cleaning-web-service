import React from "react";
import { Link } from "react-router-dom";

export default ({ stepOneClasses }) => {
  return (
    <div className={`steps__box-step ${stepOneClasses} `}>
      <Link to="/booking/step-zero">
        <div className="box-step__count">
          <i className={`ion-ios-checkmark `}></i>
          <div>1</div>
        </div>
        <div>Your booking</div>
      </Link>
    </div>
  );
};

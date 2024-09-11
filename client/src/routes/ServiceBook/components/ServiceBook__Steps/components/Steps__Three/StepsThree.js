import React from "react";
import { Link } from "react-router-dom";

export default ({ stepThreeClasses }) => {
  return (
    <div className={`steps__box-step ${stepThreeClasses} `}>
      <Link to="/booking/step-three">
        <div className="box-step__count">
          <i className="ion-ios-checkmark"></i>
          <div>3</div>
        </div>
        <div>Confirmation</div>
      </Link>
    </div>
  );
};

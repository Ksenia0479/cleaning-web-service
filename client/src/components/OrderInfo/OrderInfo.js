import React from "react";
import classNames from "classnames";

// styles
import "./order-info.css";

export default ({ orderNumber, status }) => {
  const iconType = classNames({
    "ion-md-time": status === "pending",
    "ion-md-close-circle-outline": status === "denied",
    "ion-md-checkmark": status === "approved"
  });
  return (
    <div className="booking-success__booking-info">
      <div className="booking-info__item">
        <div className="item__title">Order number</div>
        <div className="item__order-info">{orderNumber}</div>
      </div>
      <div className="booking-info__item">
        <div className="item__title">Status</div>
        <div className="item__order-info">
          <i className={iconType}></i>
          <div>{status}</div>
        </div>
      </div>
    </div>
  );
};

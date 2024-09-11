import React from "react";
import classNames from "classnames";

// styles
import "./orders-item-status.css";

export default ({ status }) => {
  const iconType = classNames({
    "ion-md-time": status === "pending",
    "ion-md-close-circle-outline": status === "denied",
    "ion-md-checkmark": status === "approved"
  });

  return (
    <div className="order__status">
      <i className={iconType}></i>
      {status}
    </div>
  );
};

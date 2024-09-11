import React from "react";

// styles
import "./orders-item-price.css";

export default ({ price }) => {
  return <div className="order__price">${price}</div>;
};

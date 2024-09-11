import React from "react";
import { Link } from "react-router-dom";

// utils
import { formatDate } from "utils";

// styles
import "./orders-item-details.css";

export default ({ id, createdAt, category, orderNumber }) => {
  return (
    <div className="order__details">
      <div className="item__order-number">
        <Link to={`/orders/${category}?id=${id}`}>{orderNumber}</Link>
      </div>
      <div className="item__order-created-at">{formatDate(createdAt)}</div>
    </div>
  );
};

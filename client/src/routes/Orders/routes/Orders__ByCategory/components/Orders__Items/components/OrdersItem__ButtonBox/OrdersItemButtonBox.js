import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// components
import { Button } from "components";

// styles
import "./orders-item-button-box.css";

export default ({
  id,
  role,
  status,
  category,
  completed,
  approveOrder,
  completeOrder
}) => {
  const isCompany = role === "company";
  const isPendingStatus = status === "pending";
  const isApprovedStatus = status === "approved";
  const denyOrderPath = `/orders/${category}?id=${id}&status=${"deny"}`;
  const viewOrderPath = `/orders/${category}?id=${id}`;

  return (
    <div className="orders__button-box">
      {isCompany && isPendingStatus && (
        <Fragment>
          <Button
            value="Approve"
            onClick={() => {
              approveOrder(id);
            }}
          />
          <Link to={denyOrderPath} className="btn btn-action">
            Deny
          </Link>
        </Fragment>
      )}

      {isCompany && !completed && isApprovedStatus && (
        <Button
          value="Complete Order"
          className="btn__complete-order"
          onClick={() => {
            completeOrder(id);
          }}
        />
      )}

      <Link to={viewOrderPath} className="btn btn-ghost">
        View details
      </Link>
    </div>
  );
};

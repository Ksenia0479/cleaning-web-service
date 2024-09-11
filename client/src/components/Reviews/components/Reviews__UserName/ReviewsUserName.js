import React from "react";
import Rating from "@material-ui/lab/Rating";

// styles
import "./reviews-user-name.css";

export default ({ firstName, lastName, rating }) => {
  return (
    <div className="modal__review-customer-name">
      <div>{`${firstName} ${lastName}`}</div>
      <Rating value={rating} size="small" readOnly />
    </div>
  );
};

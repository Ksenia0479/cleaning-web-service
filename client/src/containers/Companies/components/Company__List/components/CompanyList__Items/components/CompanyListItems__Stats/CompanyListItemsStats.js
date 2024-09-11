import React from "react";
import Rating from "@material-ui/lab/Rating";

// styles
import "./company-list-items-stats.css";

export default ({ rating, cleans }) => {
  return (
    <div className="company-item__stats">
      <div>
        <p>Rating</p>
        <Rating value={rating} readOnly />
      </div>
      <div></div>
      <div>
        <p>Cleanings</p>
        <div>{cleans}</div>
      </div>
    </div>
  );
};

import React from "react";

// utils
import { formatDate } from "utils";

// styles
import "./reviews-created-at.css";

export default ({ createdAt }) => {
  return (
    <div className="modal__review-created-at">{formatDate(createdAt)}</div>
  );
};

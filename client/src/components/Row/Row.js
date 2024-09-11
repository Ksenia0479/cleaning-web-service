import React from "react";

// styles
import "./row.css";

export default ({ children, className = "" }) => {
  return <div className={`row ${className}`}>{children}</div>;
};

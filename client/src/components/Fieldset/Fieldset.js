import React from "react";

// styles
import "./fieldset.css";

export default ({ children, className = "" }) => {
  return <fieldset className={className}>{children}</fieldset>;
};

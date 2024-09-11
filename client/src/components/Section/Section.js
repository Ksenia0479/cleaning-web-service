import React from "react";

// styles
import "./section.css";

export default ({ children, className = "" }) => {
  return <section className={className}>{children}</section>;
};

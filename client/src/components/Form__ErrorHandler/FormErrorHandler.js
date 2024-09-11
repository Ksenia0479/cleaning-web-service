import React from "react";

// styles
import "./form-error-handler.css";

export default ({ error }) => {
  return <div className="form__error">{error}</div>;
};

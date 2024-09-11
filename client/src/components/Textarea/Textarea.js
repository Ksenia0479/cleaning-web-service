import React from "react";

// styles
import "./textarea.css";

export default ({ input, meta, className = "", ...custom }) => {
  return (
    <div className={`form__textarea`}>
      <textarea {...input} {...custom} className={className} />
    </div>
  );
};

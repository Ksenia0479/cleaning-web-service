import React from "react";
import { Link } from "react-router-dom";

// styles
import "./not-member.css";

export default () => {
  return (
    <p className="not-member">
      Not a member?
      <span>
        <Link to="/signup/customer">Sign up now</Link>
      </span>
    </p>
  );
};

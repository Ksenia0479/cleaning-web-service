import React from "react";
import { Link } from "react-router-dom";

// styles
import "./send-it-again.css";

export default () => {
  return (
    <div className="send-it-again__box">
      Didn't receive the email? <Link to="/signup/identify">Send it again</Link>
    </div>
  );
};

import React from "react";

// components
import { SendItAgain } from "components";

// styles
import "./signup-text-box.css";

export default () => {
  return (
    <div className="signup-confirmation__text-box">
      <div>
        Please check your inbox for a confirmation email. Click the link in the
        email to confirm your email address
      </div>
      <SendItAgain />
    </div>
  );
};

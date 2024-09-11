import React from "react";

// styles
import "./user-contact.css";

export default ({ contact }) => {
  return (
    <div className="user__email-address">
      Your email address: <span>{contact.email_address}</span>
    </div>
  );
};

import React from "react";

// styles
import "./user-photo.css";

export default ({ url }) => {
  return (
    <div className="user__photo-box">
      <div className="user__photo-wrapper">
        <img alt="avatar" src={url} />
      </div>
    </div>
  );
};

import React from "react";

// components
import { HeaderButtonBox } from "./components";

// styles
import "./header-text-box.css";

export default () => {
  return (
    <div className="header__text-box">
      <h1>Book your cleaner today</h1>
      <h3>Reliable customer service. Professional and Trusted Cleaners.</h3>
      <HeaderButtonBox />
    </div>
  );
};

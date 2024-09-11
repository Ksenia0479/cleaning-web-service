import React from "react";

// components
import { HeaderNavList, HeaderLogo } from "./components";

// styles
import "./header-nav-box.css";

export default () => {
  return (
    <div className="header__nav-box">
      <HeaderLogo />
      <HeaderNavList />
    </div>
  );
};

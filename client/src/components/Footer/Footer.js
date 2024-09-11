import React from "react";

// components
import { Row } from "components";

// components - Footer
import { FooterMainNav, FooterSocialLinks } from "./components";

// styles
import "./footer.css";

export default ({ className = "" }) => {
  return (
    <footer className={className}>
      <Row>
        <div className="footer__nav-box">
          <FooterMainNav />
          <FooterSocialLinks />
        </div>
        <p>All rights reserved | &copy; 2019 Cleaning Company</p>
      </Row>
    </footer>
  );
};

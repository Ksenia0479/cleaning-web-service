import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classNames from "classnames";

// components
import { Row } from "components";

// components - Header
import { HeaderTextBox, HeaderNavBox } from "./components";

// actions
import { fetchImage } from "store/actions";

// styles
import "./header.css";

class Header extends Component {
  componentDidMount() {
    const { isSignedIn, fetchImage } = this.props;
    isSignedIn && fetchImage();
  }

  render() {
    const {
      isSignedIn,
      location: { pathname }
    } = this.props;

    const isHomePage = pathname === "/";

    const headerBoxClasses = classNames({
      "header__nav-main": isHomePage,
      "header__nav-sticky": !isHomePage,
      "signed-in": isSignedIn
    });

    return (
      <header className={headerBoxClasses}>
        <nav>
          <Row>
            <HeaderNavBox />
          </Row>
        </nav>
        {isHomePage && <HeaderTextBox />}
      </header>
    );
  }
}

const mapStateToProps = state => {
  const {
    auth: {
      user: { isSignedIn }
    }
  } = state;
  return { isSignedIn };
};

const mapDispatchToProps = { fetchImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));

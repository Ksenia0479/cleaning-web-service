import React, { Component } from "react";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import Rating from "@material-ui/lab/Rating";

// components
import { Logo } from "components";

// components - UserSidebar
import { UserNav } from "./components";

// actions
import { fetchCompany, fetchImage } from "store/actions";

// utils
import { getTokens } from "utils";

// styles
import "./user-sidebar.css";

class UserSidebar extends Component {
  componentDidMount() {
    const { fetchCompany, fetchImage } = this.props;
    const { token } = getTokens();
    const {
      user: { _id }
    } = jwtDecode(token);

    fetchCompany(_id);
    fetchImage();
  }

  render() {
    const { url, rating, role } = this.props;
    const isCompany = role === "company";

    return (
      <div className="user__sidebar-box">
        <Logo logo={url} />
        {isCompany && <Rating value={rating} readOnly />}
        <UserNav role={role} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    images: {
      avatar: { data: url }
    },
    auth: {
      user: {
        data: { role }
      }
    },
    companies: {
      fetchedData: { data: { rating } = {} }
    }
  } = state;

  return { url, rating, role };
};

const mapDispatchToProps = { fetchCompany, fetchImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSidebar);

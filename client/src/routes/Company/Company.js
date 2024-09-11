import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// components
import { Modal } from "components";

// components - CompanyInfo
import { CompanyInfo } from "./components";

// actions
import {
  fetchReviews,
  registerOrder,
  updateSelectedCompany
} from "store/actions";

// utils
import { history } from "utils";

class Company extends Component {
  componentDidMount() {
    /* TODO - infinite pagination
    const { _id, fetchReviews } = this.props;
    fetchReviews(_id); */
  }

  onProceedToBookingClick = () => {
    const { registerOrder, updateSelectedCompany, data, _id } = this.props;

    const selectedCompany = _.find(data, { _id });
    updateSelectedCompany(selectedCompany);

    registerOrder(undefined, { assignee: _id });
  };

  render() {
    const { company, path, _id } = this.props;

    return (
      _id && (
        <Modal>
          <CompanyInfo
            id={_id}
            path={path}
            company={company}
            onProceedToBookingClick={this.onProceedToBookingClick}
          />
        </Modal>
      )
    );
  }
}

const mapStateToProps = state => {
  const {
    companies: {
      fetchedData: { isLoaded, data }
    },
    auth: {
      user: { isSignedIn }
    },
    reviews,
    registeredOrder,
    selectedCompany
  } = state;

  const _id = new URLSearchParams(history.location.search).get("id");
  const path = isSignedIn ? `/reviews/create-review/${_id}` : `/signin`;
  const company = isLoaded && _.find(data, { _id });

  return {
    company,
    path,
    data,
    _id,
    reviews,
    registeredOrder,
    selectedCompany
  };
};

const mapDispatchToProps = {
  fetchReviews,
  registerOrder,
  updateSelectedCompany
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Company);

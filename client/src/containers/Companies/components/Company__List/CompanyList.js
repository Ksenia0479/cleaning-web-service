import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// components
import { InfiniteScrolling } from "containers";

// components - CompanyList
import { CompanyListSortMenu, CompanyListItems } from "./components";

// actions
import { updateSelectedCompany, removeSelectedCompany } from "store/actions";

// styles
import "./company-list.css";

class CompanyList extends Component {
  onButtonClick = _id => {
    const {
      data,
      selectedCompany,
      updateSelectedCompany,
      removeSelectedCompany
    } = this.props;

    if (_id === selectedCompany._id) {
      removeSelectedCompany();
    } else {
      const newSelectedCompany = _.find(data, { _id });
      updateSelectedCompany(newSelectedCompany);
    }
  };

  render() {
    const {
      data,
      message,
      isLoaded,
      sortOptions,
      selectedCompany
    } = this.props;

    return (
      <div className="companies__box">
        <CompanyListSortMenu sortOptions={sortOptions} />
        <InfiniteScrolling dataName="COMPANIES">
          <CompanyListItems
            companies={data}
            isLoaded={isLoaded}
            selectedCompany={selectedCompany}
            onButtonClick={this.onButtonClick}
          />
        </InfiniteScrolling>
        {_.isEmpty(data) && <div>{message}</div>}
      </div>
    );
  }
}

const mapDispatchToProps = { updateSelectedCompany, removeSelectedCompany };

export default connect(
  null,
  mapDispatchToProps
)(CompanyList);

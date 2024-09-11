import React, { Component } from "react";
import { connect } from "react-redux";

// containers
import { Companies } from "containers";

// actions
import { fetchCompanies } from "store/actions";

const sortOptions = [
  { label: "None", value: "" },
  { label: "Highest rating", value: "rating" },
  { label: "Highest number of cleans", value: "cleans" }
];

class CompaniesPage extends Component {
  componentDidMount() {
    this.props.fetchCompanies();
  }

  render() {
    const {
      data,
      message,
      isLoaded,
      selectedCompany,
      totalNumberOfCompanies
    } = this.props;

    return (
      <Companies
        data={data}
        message={message}
        isLoaded={isLoaded}
        sortOptions={sortOptions}
        selectedCompany={selectedCompany}
        totalNumberOfCompanies={totalNumberOfCompanies}
      />
    );
  }
}

const mapStateToProps = state => {
  let {
    selectedCompany,
    companies: {
      fetchedData: { isLoaded },
      paginatedData: { data = [], message } = {},
      filteredData: { data: totalNumberOfCompanies = [] } = {}
    }
  } = state;

  totalNumberOfCompanies = totalNumberOfCompanies.length;

  return {
    data,
    message,
    isLoaded,
    selectedCompany,
    totalNumberOfCompanies
  };
};
const mapDispatchToProps = { fetchCompanies };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompaniesPage);

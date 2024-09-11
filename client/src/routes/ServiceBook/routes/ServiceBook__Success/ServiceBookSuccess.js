import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

// components
import { Footer } from "components";

// components - Success
import { SuccessSectionInfo } from "./components";

// actions
import { fetchOrder } from "store/actions";

class ServiceBookSuccess extends Component {
  componentDidMount() {
    const { params: { id } = {}, fetchOrder } = this.props;

    console.log("fetchOrder");
    id && fetchOrder(id);
  }

  render() {
    const {
      orders: {
        fetchedData: { data = {} }
      }
    } = this.props;

    return (
      <Fragment>
        <SuccessSectionInfo order={data} />
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { orders } = state;

  const {
    match: { params }
  } = props;

  return { params, orders };
};
const mapDispatchToProps = { fetchOrder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceBookSuccess);

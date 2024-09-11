import React, { Component } from "react";
import { connect } from "react-redux";

// components
import { Spinner } from "components";

// actions
import { paginateData } from "store/actions";

// styles
import "./infinite-scrolling.css";

class InfiniteScrolling extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { paginateData, dataName, paginatedDataKey } = this.props;
    if (dataName) {
      window.innerHeight + window.scrollY ===
        document.documentElement.offsetHeight &&
        setTimeout(() => {
          paginateData(dataName, paginatedDataKey);
        }, 250);
    } else {
      window.removeEventListener("scroll", this.handleScroll);
    }
  };

  render() {
    const { children, isLoading = false } = this.props;
    return (
      <div
        className="infinite-scrolling__container"
        ref={ref => {
          this.InfiniteScrollingBlock = ref;
        }}
      >
        {children}
        {isLoading && (
          <div className="spinner__wrapper">
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = { paginateData };

export default connect(
  null,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(InfiniteScrolling);

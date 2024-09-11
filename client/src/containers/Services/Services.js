import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// components
import { Button, FormErrorHandler } from "components";

// fields - Services
import { ServicesFields } from "./fields";

// actions
import { getServices, removeService, addService } from "store/actions";

// styles
import "./services.css";

class Services extends Component {
  componentDidMount() {
    const {
      fields: { name },
      getServices
    } = this.props;

    getServices({ name });
  }

  onAddOptionClick = ({ name, getAll, unshift }) => {
    const options = getAll();

    _.map(options, option => {
      this.props.removeService({ name, option });
    });

    unshift({});
  };

  onRemoveOptionClick = ({ name, get, remove }, index) => {
    const option = get(index);

    option.type && this.props.addService({ name, option });

    remove(index);
  };

  render() {
    const {
      fields,
      options,
      addServiceButtonName,
      meta: { error, submitFailed }
    } = this.props;
    return (
      <Fragment>
        {error && submitFailed && <FormErrorHandler error={error} />}
        <ul>
          <li>
            <Button
              value={addServiceButtonName}
              onClick={() => {
                this.onAddOptionClick(fields);
              }}
            />
          </li>

          {fields.map((service, index) => {
            return (
              <li key={index} className="form__item">
                <ServicesFields name={service} options={options} />
                <Button
                  className="remove"
                  onClick={() => {
                    this.onRemoveOptionClick(fields, index);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

const mapDispatchToProps = { getServices, removeService, addService };

const mapStateToProps = (state, prop) => {
  const {
    fields: { name }
  } = prop;

  const options = state[name];

  return { options };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services);

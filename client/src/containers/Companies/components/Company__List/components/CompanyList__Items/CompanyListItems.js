import React, { Fragment } from "react";
import _ from "lodash";
import classNames from "classnames";

// components
import { Spinner } from "components";

// components - CompanyList__Items
import {
  CompanyListItemsHeader,
  CompanyListItemsStats,
  CompanyListItemsButtons
} from "./components";

// styles
import "./company-list-items.css";

export default ({ companies, isLoaded, selectedCompany, onButtonClick }) => {
  return (
    <Fragment>
      {isLoaded ? (
        <ul className="company-items__box">
          {_.map(companies, (company, index) => {
            const { _id, companyName, avatar, rating, price, cleans } = company;

            const isCompanySelected =
              selectedCompany && selectedCompany._id === _id;

            const companyItemClasses = classNames({
              "company-item": true,
              selected: isCompanySelected
            });

            return (
              <li key={index} className={companyItemClasses}>
                <CompanyListItemsHeader
                  id={_id}
                  price={price}
                  avatar={avatar}
                  companyName={companyName}
                />
                <CompanyListItemsStats rating={rating} cleans={cleans} />
                <CompanyListItemsButtons
                  id={_id}
                  onButtonClick={onButtonClick}
                  isCompanySelected={isCompanySelected}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

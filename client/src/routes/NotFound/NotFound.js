import React, { Fragment } from "react";

// components
import { Row, Section, MainHeader, Footer } from "components";

// styles
import "./not-found.css";

export default () => {
  return (
    <Fragment>
      <Section className="section__not-found">
        <Row>
          <MainHeader>Not found</MainHeader>
        </Row>
      </Section>
      <Footer />
    </Fragment>
  );
};

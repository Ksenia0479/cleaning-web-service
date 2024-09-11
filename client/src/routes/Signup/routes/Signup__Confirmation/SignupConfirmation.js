import React from "react";

// components
import { Row, Section, MainHeader } from "components";

// components - Signup
import { SignupTextBox } from "./components";

// styles
import "./signup-confirmation.css";

export default () => {
  return (
    <Section className="section__signup-confirmation">
      <Row>
        <MainHeader>Let's confirm your email</MainHeader>
        <SignupTextBox />
      </Row>
    </Section>
  );
};

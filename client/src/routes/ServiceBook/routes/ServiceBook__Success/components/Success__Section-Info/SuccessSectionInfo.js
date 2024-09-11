import React from "react";

// components
import {
  Row,
  Button,
  Section,
  OrderInfo,
  MainHeader,
  OrderSummary
} from "components";

// components - SectionInfo
import { SectionInfoSidebar, SectionInfoBox } from "./components";

// styles
import "./success-section-info.css";

// utils
import { history } from "utils";

export default ({ order = {} }) => {
  return (
    <Section className="section__booking-success">
      <Row>
        <div className="booking-success__wrapper">
          <SectionInfoBox>
            <MainHeader>Thank you for your booking request!</MainHeader>

            <div className="booking-success__notification">
              <div>{`We are processing your booking. Please check your email for a booking confirmation from ${"Company Name"}`}</div>
              <div>
                {`Please note, you should hear back within 8 hours. If you still haven't received a confirmation, please contact our suppot team on ${"0800 5677 241"}`}
              </div>
            </div>

            <Button
              className="btn-action"
              onClick={() => {
                history.go();
              }}
              value="Check status"
            />
          </SectionInfoBox>
          <SectionInfoSidebar>
            <OrderInfo
              orderNumber={order.orderNumber}
              status={order.processed && order.processed.status}
            />
            <OrderSummary order={order} />
          </SectionInfoSidebar>
        </div>
      </Row>
    </Section>
  );
};

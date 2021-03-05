import React, { useState } from "react";
import { Block } from "baseui/block";
import { ProgressSteps, Step } from "baseui/progress-steps";
import { Button } from "baseui/button";
import { PageLayout } from "./page-layout/PageLayout";

const Progress = () => {
  const [current, setCurrent] = useState(0);
  return (
    <PageLayout
      title="Your Order Progress"
      bottomButtonLabel="I'm here!"
      onBottomBtnClicked={() => setCurrent(0)}
      bottom={
        current !== 2 &&
        (() => {
          return <></>;
        })
      }
    >
      <Block flexDirection="column">
        <ProgressSteps
          current={current}
          overrides={{
            Title: {},
            Description: {
              style: ({ $theme }) => ({
                marginTop: "-30px",
                color: "grey",
              }),
            },
          }}
        >
          <Step title="Order Received">
            <p>March 5, 2021 • 2:01 PM</p>
          </Step>
          <Step title="Processing Order">
            <p>
              The store is currently processing your order. You’ll be notified
              when it’s ready for pickup.
            </p>
          </Step>
          <Step title="Ready for Pickup">
            <p>
              The store is currently processing your order. You’ll be notified
              when it’s ready for pickup.
            </p>
          </Step>
        </ProgressSteps>
        <Block>
          {/* Temp button to step forward. Will remove with firebase integration*/}
          <Button
            onClick={() => {
              setCurrent(current + 1);
            }}
            style={{ marginTop: 16 }}
          >
            Next
          </Button>
        </Block>
      </Block>
    </PageLayout>
  );
};

export default Progress;

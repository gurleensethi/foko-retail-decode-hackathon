import React, { useState } from "react";
import { Block } from "baseui/block";
import { ProgressSteps, Step } from "baseui/progress-steps";
import { Button } from "baseui/button";
import { PageLayout } from "./page-layout/PageLayout";
import ChevronRight from 'baseui/icon/chevron-right';
import { ShoppingCart, Truck } from "react-feather";
import {StatefulMenu} from 'baseui/menu';
import {
  ListItemLabel,
  MenuAdapter,
  ARTWORK_SIZES,
} from 'baseui/list';

const ITEMS = Array.of(
  {
  title: 'My Order',
  subtitle: 'Order Number: #16391A',
  icon: ShoppingCart,
  },
  {
  title: 'Pickup Information',
  subtitle: 'Honda Car, Blue',
  icon: Truck,
  }
);

const Progress = () => {
  const [current, setCurrent] = useState(0);
  return (
    <PageLayout
      title="Order Status"
      bottomButtonLabel="I'm here!"
      onBottomBtnClicked={() => setCurrent(0)}
      bottom={
        current !== 3 &&
        (() => {
          return <></>;
        })
      }
    >
      <StatefulMenu
      items={ITEMS}
      onItemSelect={() => console.log('select')}
      overrides={{
        List: {
          style: {
            height: 'flex',
            width: 'flex',
          },
        },
        Option: {
          props: {
            overrides: {
              ListItem: {
                component: React.forwardRef((props, ref) => (
                  <MenuAdapter
                    {...props}
                    ref={ref}
                    artwork={props.item.icon}
                    artworkSize={ARTWORK_SIZES.MEDIUM}
                    endEnhancer={() => <ChevronRight />}
                  >
                    <ListItemLabel
                      description={props.item.subtitle}
                    >
                      {props.item.title}
                    </ListItemLabel>
                  </MenuAdapter>
                )),
              },
            },
          },
        },
      }}
    />
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
          <Step title="Order is Pending">
            <p>The store has not confirmed your order yet</p>
          </Step>
          <Step title="Order Confirmed">
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
              Your order is now ready for pickup. Let us know when you arrived!
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

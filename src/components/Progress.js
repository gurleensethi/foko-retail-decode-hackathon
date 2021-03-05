import React, { useState, useEffect } from "react";
import { Block } from "baseui/block";
import { ProgressSteps, Step } from "baseui/progress-steps";
import { Button } from "baseui/button";
import { PageLayout } from "./page-layout/PageLayout";
import ChevronRight from "baseui/icon/chevron-right";
import { ShoppingCart, Truck } from "react-feather";
import { StatefulMenu } from "baseui/menu";
import { ListItemLabel, MenuAdapter, ARTWORK_SIZES } from "baseui/list";
import { useParams } from "react-router";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { Spinner } from "baseui/spinner";

const Progress = () => {
  const [current, setCurrent] = useState(0);
  const { orderId } = useParams();

  const orderRef = useFirestore().collection("orders").doc(orderId);
  const { data: order, status } = useFirestoreDocData(orderRef);
  useEffect(() => {
    if (order?.status) {
      switch (order?.status.toLowerCase()) {
        case "pending": {
          setCurrent(0);
          break;
        }
        case "confirmed": {
          setCurrent(1);
          break;
        }
        case "unfulfilled": {
          setCurrent(2);
          break;
        }
        case "ready_for_pickup": {
          setCurrent(3);
          break;
        }
        case "fulfilled": {
          alert("Order is complete");
          break;
        }
        default:
          alert("Unrecoganized order status", order?.status);
      }
    }
  }, [order]);

  if (status === "loading") return <Spinner />;

  const ITEMS = Array.of(
    {
      title: "My Order",
      subtitle: "Order Number: #16391A",
      icon: ShoppingCart,
    },
    {
      title: "Pickup Information",
      subtitle: order?.instructions || "Honda Car, Blue",
      icon: Truck,
    }
  );

  return (
    <PageLayout
      title="Order Status"
      bottomButtonLabel="I'm here!"
      onBottomBtnClicked={() => orderRef.update({ hasCustomerArrived: true })}
      bottom={
        current !== 3 &&
        (() => {
          return <></>;
        })
      }
    >
      <StatefulMenu
        items={ITEMS}
        onItemSelect={() => console.log("select")}
        overrides={{
          List: {
            style: {
              height: "flex",
              width: "flex",
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
                      <ListItemLabel description={props.item.subtitle}>
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
      </Block>
    </PageLayout>
  );
};

export default Progress;

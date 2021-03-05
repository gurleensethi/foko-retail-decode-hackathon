import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirestore } from "reactfire";
import { ItemsOrdered } from "../components/ItemsOrdered";
import { PageLayout } from "../components/page-layout/PageLayout";

const GridItem = ({ heading, description }) => {
  const [css] = useStyletron();

  return (
    <Block
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      width="48%"
      marginBottom="16px"
    >
      <Block className={css({ color: "#828282", fontSize: "14px" })}>
        {heading}
      </Block>
      <Block className={css({ color: "#4F4F4F", fontSize: "14px" })}>
        {description}
      </Block>
    </Block>
  );
};

export const CustomerConfirm = () => {
  const { orderId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const firestore = useFirestore();
  const [css] = useStyletron();

  useEffect(() => {
    const ordersRef = firestore.collection("orders").doc(orderId);

    const disconnect = ordersRef.onSnapshot((snapshot) => {
      setOrder({ ...snapshot.data(), id: snapshot.id });
      setLoading(false);
    });

    return () => disconnect();
  }, [firestore, orderId]);

  console.log(order);

  return (
    <PageLayout title="Order Completed" bottomButtonLabel="Rate Your Order">
      <Block
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Block marginBottom="16px">Thank your for the order</Block>
        <ItemsOrdered
          header={
            isLoading ? (
              <Block margin="0 auto" display="flex" justifyContent="center">
                <Spinner size="32px" color="black" />
              </Block>
            ) : (
              <Block
                padding="8px"
                alignSelf="stretch"
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <GridItem
                  heading={"Contact Information"}
                  description={order.customerName}
                />
                <GridItem
                  heading={"Order Number"}
                  description={`#${order.id}`.substr(0, 4)}
                />
                <GridItem
                  heading={"Pickup Date"}
                  description={
                    <div>
                      March 10, 2021
                      <br />
                      5:30 - 6:00 PM
                    </div>
                  }
                />
                <GridItem
                  heading={"Store Location"}
                  description={
                    <div>
                      1936 Dundas St West
                      <br /> M72 B3H
                    </div>
                  }
                />
                <GridItem
                  heading={"Date of Payment"}
                  description={
                    <div>
                      {format(Date.now(), "MMMM dd, yyyy")}
                      <br />
                      {format(Date.now() - 2 * 60 * 1000, "hh:mm a")}
                    </div>
                  }
                />
                <GridItem
                  heading={"Payment Method"}
                  description={
                    <div>
                      Visa *5001 <br />
                      12/23
                    </div>
                  }
                />
              </Block>
            )
          }
          orderId={orderId}
        />
      </Block>
    </PageLayout>
  );
};

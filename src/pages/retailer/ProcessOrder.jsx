import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFirestore } from "reactfire";
import { useStyletron } from "styletron-react";
import { ItemsOrdered } from "../../components/ItemsOrdered";
import { PageLayout } from "../../components/page-layout/PageLayout";

function getDataMappedToStatus(status) {
  switch (status) {
    case "pending":
      return { bottomBtnLabel: "Confirm Order" };
    case "unfulfilled":
      return { bottomBtnLabel: "Preprare Order Now" };
    case "ready_for_pickup":
      return { bottomBtnLabel: "Scan Pick Up Code" };
    case "fulfilled":
      return { bottomBtnLabel: "Back to Orders" };
    default:
      return { bottomBtnLabel: "Confirm Order" };
  }
}
export const ProcessOrder = () => {
  const { orderId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isStatusChangeLoading, setStatusChangeLoading] = useState(false);
  const [order, setOrder] = useState({});
  const firestore = useFirestore();
  const [css] = useStyletron();
  const history = useHistory();

  useEffect(() => {
    const ordersRef = firestore.collection("orders").doc(orderId);

    const disconnect = ordersRef.onSnapshot((snapshot) => {
      setOrder({ ...snapshot.data(), id: snapshot.id });
      setLoading(false);
    });

    return () => disconnect();
  }, [firestore, orderId]);

  const updateOrderStatus = (newStatus) => {
    setStatusChangeLoading(true);
    firestore
      .collection("orders")
      .doc(orderId)
      .update({ status: newStatus })
      .then(() => {
        setStatusChangeLoading(false);
      });
  };

  const handleBottomBtnClicked = () => {
    switch (order.status.toLowerCase()) {
      case "pending": {
        updateOrderStatus("unfulfilled");
        break;
      }
      case "unfulfilled": {
        updateOrderStatus("ready_for_pickup");
        break;
      }
      case "ready_for_pickup": {
        updateOrderStatus("fulfilled");
        break;
      }
      case "fulfilled": {
        history.replace("/retailer/upcoming-orders");
        break;
      }
      default:
        alert("Unrecoganized order status", order.status);
    }
  };

  const { bottomBtnLabel } = getDataMappedToStatus(order.status);

  return (
    <PageLayout
      title="Process Order"
      bottomButtonLabel={bottomBtnLabel}
      isBottomButtonLoading={isStatusChangeLoading}
      onBottomBtnClicked={handleBottomBtnClicked}
    >
      <Block>
        {isLoading ? (
          <Block margin="0 auto" display="flex" justifyContent="center">
            <Spinner size="32px" color="black" />
          </Block>
        ) : (
          <Block>
            <Block
              display="flex"
              justifyContent="space-between"
              marginBottom="8px"
            >
              <ParagraphMedium margin="0px">Order Status</ParagraphMedium>
              <ParagraphMedium margin="0px">
                {order.status.toLowerCase()}
              </ParagraphMedium>
            </Block>
            <Block
              margin="16px 0px 16px 0px"
              height="1px"
              width="100%"
              backgroundColor="lightgrey"
            />
            <Block display="flex" marginBottom="16px">
              <Block flex="1">
                <ParagraphSmall
                  margin="0"
                  className={css({ fontWeight: "bold", opacity: 0.9 })}
                  color="#4F4F4F"
                >
                  Customer Details
                </ParagraphSmall>
                <ParagraphSmall margin="0" color="#828282">
                  {order.customerName}
                </ParagraphSmall>
                <ParagraphSmall margin="0px 0px 8px 0px">
                  {order.email}
                </ParagraphSmall>
                <ParagraphSmall
                  margin="0"
                  className={css({ fontWeight: "bold", opacity: 0.9 })}
                  color="#4F4F4F"
                >
                  Pickup Information
                </ParagraphSmall>
                <ParagraphSmall margin="0px 0px 0px 0px" color="#828282">
                  {format(
                    new Date(order.pickupAt.seconds * 1000),
                    "MMMM dd, yyyy • hh:mm a"
                  )}
                </ParagraphSmall>
                <ParagraphSmall margin="0px 0px 0px 0px" color="#828282">
                  {order.pickupDetails["carColor"]}{" "}
                  {order.pickupDetails["carType"]} |{" "}
                  {Object.keys(order.items).length} Items
                </ParagraphSmall>
              </Block>
            </Block>
            <ItemsOrdered orderId={order.id} />
          </Block>
        )}
      </Block>
    </PageLayout>
  );
};

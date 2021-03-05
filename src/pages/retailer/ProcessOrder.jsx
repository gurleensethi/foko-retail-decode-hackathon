import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import {
  HeadingSmall,
  ParagraphMedium,
  ParagraphSmall,
} from "baseui/typography";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFirestore } from "reactfire";
import { useStyletron } from "styletron-react";
import { CustomTag } from "../../components/CustomTag";
import { ItemsOrdered } from "../../components/ItemsOrdered";
import { PageLayout } from "../../components/page-layout/PageLayout";
import { Modal } from "baseui/modal";
import { ScanQRPopup } from "../../components/ScanQRPopup";
import ChatDrawer from "../../components/ChatDrawer";

function getDataMappedToStatus(status) {
  switch (status) {
    case "pending":
      return { bottomBtnLabel: "Confirm Order", label: "Pending" };
    case "confirmed":
      return { bottomBtnLabel: "Preprare Order Now", label: "Confirmed" };
    case "unfulfilled":
      return { bottomBtnLabel: "Ready for Pickup", label: "Unfullfilled" };
    case "ready_for_pickup":
      return { bottomBtnLabel: "Scan Pick Up Code", label: "Read for Pickup" };
    case "fulfilled":
      return { bottomBtnLabel: "Back to Orders", label: "Fulfilled" };
    default:
      return { bottomBtnLabel: "Back to Orders" };
  }
}

export const ProcessOrder = () => {
  const { orderId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isStatusChangeLoading, setStatusChangeLoading] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [areAllItemsChecked, setAllItemsChecked] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
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

    const updateDoc = { status: newStatus };
    if (newStatus === "completed") {
      updateDoc.completedAt = new Date();
    }

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
        updateOrderStatus("confirmed");
        break;
      }
      case "confirmed": {
        updateOrderStatus("unfulfilled");
        break;
      }
      case "unfulfilled": {
        updateOrderStatus("ready_for_pickup");
        break;
      }
      case "ready_for_pickup": {
        setModalOpen(true);
        // updateOrderStatus("fulfilled");
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

  const { bottomBtnLabel, label } = getDataMappedToStatus(order.status);

  return (
    <PageLayout
      title="Process Order"
      bottomButtonLabel={bottomBtnLabel}
      isBottomButtonLoading={isStatusChangeLoading}
      onBottomBtnClicked={handleBottomBtnClicked}
      isBottomButtonDisabled={
        order.status === "unfulfilled" && !areAllItemsChecked
      }
    >
      <Block>
        {isLoading ? (
          <Block margin="0 auto" display="flex" justifyContent="center">
            <Spinner size="32px" color="black" />
          </Block>
        ) : (
          <Block>
            {order.status !== "fulfilled" && (
              <>
                <Block
                  display="flex"
                  justifyContent="space-between"
                  marginBottom="8px"
                >
                  <ParagraphMedium margin="0px">Order Status</ParagraphMedium>
                  <ParagraphMedium margin="0px">
                    <Block display="inline" marginRight="8px">
                      <CustomTag
                        text={"Paid"}
                        textColor="#2E7551"
                        backgroundColor="#C8F0C6"
                      />
                    </Block>
                    <CustomTag
                      text={label}
                      textColor="#654B86"
                      backgroundColor="#FBF9FF"
                    />
                  </ParagraphMedium>
                </Block>
                <Block
                  margin="16px 0px 16px 0px"
                  height="1px"
                  width="100%"
                  backgroundColor="lightgrey"
                />
                <Block display="flex" margin="16px">
                  <Block flex="1">
                    <Block display="flex" alignItems="flex-start">
                      <Block marginRight="12px" marginTop="2px">
                        <img
                          src="/icons/user.svg"
                          height="16px"
                          alt="user icon"
                        />
                      </Block>
                      <Block flex="1">
                        <ParagraphSmall
                          margin="0"
                          className={css({ fontWeight: "600" })}
                        >
                          Customer Details
                        </ParagraphSmall>
                        <ParagraphSmall margin="0" color="#828282">
                          {order.customerName}
                        </ParagraphSmall>
                        <ParagraphSmall margin="0px 0px 8px 0px">
                          {order.email}
                        </ParagraphSmall>
                      </Block>
                      <Block
                        className={css({
                          border: "1.5px solid #828282",
                          borderRadius: "6px",
                          padding: "6px 10px",
                          color: "#222222",
                        })}
                        onClick={() => setChatOpen(true)}
                      >
                        Message
                      </Block>
                    </Block>
                    <Block display="flex" alignItems="flex-start">
                      <Block marginRight="12px" marginTop="2px">
                        <img
                          src="/icons/information.svg"
                          height="16px"
                          alt="user icon"
                        />
                      </Block>
                      <Block>
                        <ParagraphSmall
                          margin="0"
                          className={css({ fontWeight: "600" })}
                        >
                          Pickup Information
                        </ParagraphSmall>
                        <ParagraphSmall
                          margin="0px 0px 0px 0px"
                          color="#828282"
                        >
                          {format(
                            new Date(order.pickupAt.seconds * 1000),
                            "MMMM dd, yyyy • hh:mm a"
                          )}
                        </ParagraphSmall>
                        <ParagraphSmall
                          margin="0px 0px 0px 0px"
                          color="#828282"
                        >
                          {order.instructions} | {" "}
                          {Object.keys(order.items).length} Items
                        </ParagraphSmall>
                      </Block>
                    </Block>
                  </Block>
                </Block>
                {order.hasCustomerArrived && (
                  <Block
                    marginBottom="16px"
                    className={css({
                      padding: "16px",
                      borderLeft: "4px solid rgba(137, 204, 165, 1.0)",
                      background: "rgba(137, 204, 165, 0.25)",
                      fontWeight: "600",
                      fontSize: "14px",
                    })}
                  >
                    {order.customerName} has arrived!
                  </Block>
                )}
                <ItemsOrdered
                  orderId={order.id}
                  enableCheckbox={order.status === "unfulfilled"}
                  onCheckChanged={(allChecked) =>
                    setAllItemsChecked(allChecked)
                  }
                />
              </>
            )}
            {order.status === "fulfilled" && (
              <Block
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                padding="16px"
              >
                <HeadingSmall>Order Completed!</HeadingSmall>
                <img src="/icons/store_1.svg" height="260px" alt="user icon" />
                <Block
                  display="flex"
                  justifyContent="space-between"
                  marginBottom="8px"
                  alignSelf="stretch"
                >
                  <div className={css({ fontWeight: "600" })} margin="0px">
                    Pickup Details
                  </div>
                </Block>
                <Block
                  margin="16px 0px 16px 0px"
                  height="1px"
                  width="100%"
                  backgroundColor="lightgrey"
                />
                <Block flex="1" alignSelf="stretch">
                  <ParagraphSmall
                    margin="0"
                    className={css({ fontWeight: "600" })}
                  >
                    Customer Details
                  </ParagraphSmall>
                  <ParagraphSmall margin="0" color="#828282">
                    {order.customerName}
                  </ParagraphSmall>
                  <ParagraphSmall margin="0px 0px 8px 0px">
                    {order.email}
                  </ParagraphSmall>
                </Block>
              </Block>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
              <ScanQRPopup
                onClose={() => {
                  setModalOpen(false);
                  updateOrderStatus("fulfilled");
                }}
                customerName={order.customerName}
              />
            </Modal>
            <ChatDrawer
              isOpen={isChatOpen}
              isRetailer={true}
              orderId={order.id}
              setIsOpen={setChatOpen}
            />
          </Block>
        )}
      </Block>
    </PageLayout>
  );
};

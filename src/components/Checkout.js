import React from "react";
import { useStyletron } from "baseui";
import { PageLayout } from "./page-layout/PageLayout";
import ChevronRight from "baseui/icon/chevron-right";
import { StatefulMenu } from "baseui/menu";
import { ListItemLabel, MenuAdapter, ARTWORK_SIZES } from "baseui/list";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Input } from "baseui/input";
import { KIND as ButtonKind } from "baseui/button";
import {
  User,
  MapPin,
  Calendar,
  CreditCard,
  Tag,
  ShoppingCart,
  Clipboard,
} from "react-feather";
import { PaymentCard } from "baseui/payment-card";
import { useFirestore } from "reactfire";
import { useHistory } from "react-router-dom";

const ITEMS = Array.of(
  {
    title: "Customer Information",
    infoLine1: "Casey He",
    infoLine2: "Casey123@gmail.com",
    icon: User,
    inputElement: (
      [input1Value, setInput1Value],
      [input2Value, setInput2Value]
    ) => (
      <div>
        <div style={{ marginBottom: "16px" }}>
          <Input
            value={input1Value === false ? ITEMS[0].infoLine1 : input1Value}
            onChange={(e) => setInput1Value(e.target.value)}
            placeholder="Enter Name"
            clearOnEscape
          />
        </div>
        <Input
          value={input2Value === false ? ITEMS[0].infoLine2 : input2Value}
          onChange={(e) => setInput2Value(e.target.value)}
          placeholder="Enter email"
          clearOnEscape
          type="email"
        />
      </div>
    ),
  },
  {
    title: "Store Location",
    infoLine1: "1936 Dundas St West",
    infoLine2: "M72 B3H",
    icon: MapPin,
    inputElement: (
      [input1Value, setInput1Value],
      [input2Value, setInput2Value]
    ) => (
      <div>
        <div style={{ marginBottom: "16px" }}>
          <Input
            value={input1Value === false ? ITEMS[1].infoLine1 : input1Value}
            onChange={(e) => setInput1Value(e.target.value)}
            placeholder="Street Address"
            clearOnEscape
          />
        </div>
        <Input
          value={input2Value === false ? ITEMS[1].infoLine2 : input2Value}
          onChange={(e) => setInput2Value(e.target.value)}
          placeholder="Postal Code"
          clearOnEscape
        />
      </div>
    ),
  },
  {
    title: "Date & Time",
    infoLine1: "March 10, 2021",
    infoLine2: "11:30 - 12:00 AM",
    icon: Calendar,
  },
  {
    title: "Payment Method",
    infoLine1: "Visa*5001",
    infoLine2: "12/2023",
    icon: CreditCard,
    inputElement: ([input1Value, setInput1Value]) => (
      <div>
        <PaymentCard
          value={input1Value === false ? "" : input1Value}
          onChange={(e) => setInput1Value(e.target.value)}
          clearOnEscape
          placeholder="Please enter your credit card number..."
        />
      </div>
    ),
  },
  {
    title: "Promo Code",
    infoLine1: "",
    infoLine2: "",
    icon: Tag,
    inputElement: ([input1Value, setInput1Value]) => (
      <div>
        <Input
          value={input1Value === false ? ITEMS[4].infoLine1 : input1Value}
          onChange={(e) => setInput1Value(e.target.value)}
          placeholder="Enter Promo Code"
          clearOnEscape
        />
      </div>
    ),
  },
  {
    title: "Items",
    infoLine1: "",
    infoLine2: "",
    icon: ShoppingCart,
  },
  {
    title: "Add Instructions",
    infoLine1: "",
    infoLine2: "",
    icon: Clipboard,
    inputElement: ([input1Value, setInput1Value]) => (
      <div>
        <Input
          value={input1Value === false ? ITEMS[6].infoLine1 : input1Value}
          onChange={(e) => setInput1Value(e.target.value)}
          placeholder="Enter Instructions"
          clearOnEscape
        />
      </div>
    ),
  }
);

const Checkout = () => {
  const [css] = useStyletron();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(false);
  const [input1Value, setInput1Value] = React.useState(false);
  const [input2Value, setInput2Value] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const fieldValue = useFirestore.FieldValue;
  const ordersRef = useFirestore().collection("orders_test");

  const history = useHistory();

  return (
    <PageLayout
      title="Checkout"
      bottomButtonLabel="Place Order"
      isBottomButtonLoading={submitted}
      onBottomBtnClicked={async () => {
        console.log({ ITEMS });
        setSubmitted(true);
        const res = await ordersRef.add({
          status: "pending",
          cutomerName: ITEMS[0].infoLine1,
          customerId: ITEMS[0].infoLine2,
          storeAddress: ITEMS[1].infoLine1,
          storePostal: ITEMS[1].infoLine2,
          paymentMethod: ITEMS[3].infoLine1 + ", " + ITEMS[3].infoLine2,
          promoCode: ITEMS[4].infoLine1,
          instructions: ITEMS[6].infoLine1 || "Honda Car, Blue",
          placedAt: fieldValue.serverTimestamp(),
          // hardcoded item ids for now
          items: {
            UqLqjoZ82Fa8Ge8QmWeU: 1,
            lKnceHKAui5xxu72ZLxF: 1,
          },
        });

        history.push("/confirmation-loading/" + res.id);
      }}
    >
      <StatefulMenu
        items={ITEMS}
        onItemSelect={({ item }) => {
          console.log({ item });
          setSelectedItem(item);
          if (item.inputElement && typeof item.inputElement === "function")
            setModalOpen(true);
        }}
        overrides={{
          List: {
            style: {
              height: "600px",
              width: "350px",
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
                      <ListItemLabel description={props.item.infoLine2}>
                        {props.item.title}
                        <ListItemLabel
                          description={props.item.infoLine1}
                        ></ListItemLabel>
                      </ListItemLabel>
                    </MenuAdapter>
                  )),
                },
              },
            },
          },
        }}
      />
      <div>
        <h3
          className={css({
            display: "inline-block",
            margin: "20px",
          })}
        >
          Order Total:
        </h3>
        <p
          className={css({
            display: "inline-block",
            margin: "20px",
            float: "right",
          })}
        >
          $40.00
        </p>
      </div>
      <Modal
        onClose={() => setModalOpen(false)}
        closeable
        isOpen={isModalOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>{selectedItem && selectedItem.title}</ModalHeader>
        <ModalBody>
          Update the order details below.
          {selectedItem &&
            typeof selectedItem.inputElement === "function" &&
            selectedItem.inputElement(
              [input1Value, setInput1Value],
              [input2Value, setInput2Value]
            )}
        </ModalBody>
        <ModalFooter>
          <ModalButton
            kind={ButtonKind.tertiary}
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </ModalButton>
          <ModalButton
            onClick={() => {
              // update the item in the array with the inputted data
              if (input1Value) {
                selectedItem.infoLine1 = input1Value;
              }

              if (input2Value) {
                selectedItem.infoLine2 = input2Value;
              }

              // reset input states to default
              setInput1Value(false);
              setInput2Value(false);

              setModalOpen(false);
            }}
          >
            Okay
          </ModalButton>
        </ModalFooter>
      </Modal>
    </PageLayout>
  );
};

export default Checkout;

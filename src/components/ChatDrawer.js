import { useState, useRef, useEffect } from "react";
import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreCollectionData,
} from "reactfire";
import { PageLayout } from "../components/page-layout/PageLayout";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { useLocation } from "react-router-dom";
import { Block } from "baseui/block";
import { Avatar } from "baseui/avatar";
import { Drawer, SIZE } from "baseui/drawer";
import { ArrowLeft } from "baseui/icon";

const Message = ({ message, isMine = false }) => {
  const { text } = message;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMine ? "row-reverse" : "row",
        margin: "8px 8px 8px 0px",
      }}
    >
      <Avatar
        name={message.senderName}
        size="scale1200"
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              backgroundColor: isMine ? "#EAEAEA" : "black",
            }),
          },
          Initials: {
            style: ({ $theme }) => ({
              color: isMine ? "black" : "white",
            }),
          },
        }}
      />
      <div
        style={{
          backgroundColor: isMine ? "#EAEAEA" : "black",
          color: isMine ? "black" : "white",
          borderRadius: "25px",
          maxWidth: 250,
          padding: "15px 20px",
          margin: "0 8px",
          placeSelf: "center",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const ChatDrawer = ({ isOpen = true, setIsOpen, orderId }) => {
  const [formValue, setFormValue] = useState();

  const bottomRef = useRef();
  const isRetailer = useQuery().get("isRetailer");

  const fieldValue = useFirestore.FieldValue;
  const orderRef = useFirestore().doc(
    orderId ? `orders/${orderId}` : "orders_test/vTL5OlNU3sFJTk8Wbf0h"
  );
  const messagesRef = orderRef.collection("messages");

  const { status, data: orderData } = useFirestoreDocData(orderRef);
  const { status: messagesStatus, data: messages } = useFirestoreCollectionData(
    messagesRef.orderBy("createdAt"),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, [messages]);

  if (status === "loading") return "Loading";

  const sendMessage = (e) => {
    e.preventDefault();

    messagesRef.add({
      text: formValue,
      createdAt: fieldValue.serverTimestamp(),
      senderName: isRetailer ? "Store" : orderData.customerName,
    });

    setFormValue("");
  };

  return (
    <Drawer
      autoFocus
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      size={SIZE.full}
      overrides={{
        DrawerBody: {
          style: ({ $theme }) => ({
            margin: "0 !important",
          }),
        },
      }}
      closeable={false}
    >
      <PageLayout
        title="Chat with a representative"
        bottomVisible={false}
        backButtonVisible={false}
        backButtonEnhancement={() => (
          <ArrowLeft onClick={() => setIsOpen(false)} size={32} />
        )}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div style={{ flexGrow: 1, overflow: "auto" }}>
            {messages &&
              messages.map((msg) => (
                <Message
                  key={msg.ID}
                  message={msg}
                  isMine={
                    (isRetailer && msg.senderName == "Store") ||
                    (!isRetailer && msg.senderName !== "Store")
                  }
                />
              ))}
            <span ref={bottomRef} />
          </div>
          <form onSubmit={sendMessage} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flexGrow: 1 }}>
                <Input
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  placeholder="Enter message"
                  clearOnEscape
                  overrides={{
                    Root: {
                      style: ({ $theme }) => ({}),
                    },
                  }}
                />
              </div>
              <div>
                <Button disabled={!formValue} type="submit">
                  Send
                </Button>
              </div>
            </div>
          </form>
        </div>
      </PageLayout>
    </Drawer>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default ChatDrawer;

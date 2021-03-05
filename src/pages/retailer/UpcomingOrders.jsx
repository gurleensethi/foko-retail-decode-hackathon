import { PageLayout } from "../../components/page-layout/PageLayout";
import { SearchBar } from "../../components/SearchBar";
import { Tabs, Tab } from "baseui/tabs-motion";
import { useState } from "react";
import { OrderItem } from "../../components/OrderItem";
import { Block } from "baseui/block";

const orders = [
  {
    displayId: "Order #1339HD72",
    name: "Casey He",
    email: "casey123@gmail.com",
    date: "March 10, 2021 • 11:30 AM",
    isPaid: true,
    status: "pending",
  },
  {
    displayId: "Order #1339HD72",
    name: "Casey He",
    email: "casey123@gmail.com",
    date: "March 10, 2021 • 11:30 AM",
    isPaid: false,
    status: "pending",
  },
  {
    displayId: "Order #1339HD72",
    name: "Casey He",
    email: "casey123@gmail.com",
    date: "March 10, 2021 • 11:30 AM",
    isPaid: true,
    status: "fulfilled",
  },
  {
    displayId: "Order #1339HD72",
    name: "Casey He",
    email: "casey123@gmail.com",
    date: "March 10, 2021 • 11:30 AM",
    isPaid: true,
    status: "unfulfilled",
  },
  {
    displayId: "Order #1339HD72",
    name: "Casey He",
    email: "casey123@gmail.com",
    date: "March 10, 2021 • 11:30 AM",
    isPaid: true,
    status: "fulfilled",
  },
];

const statuses = ["", "pending", "unfulfilled", "fulfilled"];

export const UpcomingOrders = () => {
  const [activeKey, setActiveKey] = useState(0);

  return (
    <PageLayout title="Upcoming Orders" bottomVisible={false}>
      <Block marginBottom="16px">
        <SearchBar />
      </Block>
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => {
          setActiveKey(Number(activeKey));
        }}
      >
        <Tab title="All" />
        <Tab title="Pending" />
        <Tab title="Unfulfilled" />
        <Tab title="Completed" />
      </Tabs>
      {orders
        .filter(
          (item) => activeKey === 0 || item.status === statuses[activeKey]
        )
        .map((item) => (
          <OrderItem order={item} />
        ))}
    </PageLayout>
  );
};

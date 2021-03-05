import { PageLayout } from "../../components/page-layout/PageLayout";
import { SearchBar } from "../../components/SearchBar";
import { Tabs, Tab } from "baseui/tabs-motion";
import { useEffect, useState } from "react";
import { OrderItem } from "../../components/OrderItem";
import { Block } from "baseui/block";

import { useFirestore } from "reactfire";
import { Spinner } from "baseui/spinner";


const statuses = ["", "pending", "unfulfilled", "fulfilled"];

export const UpcomingOrders = () => {
  const [activeKey, setActiveKey] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const firestore = useFirestore();

  useEffect(() => {
    const ordersRef = firestore.collection("orders");

    const disconnect = ordersRef.onSnapshot((snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => disconnect();
  }, [firestore]);

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
      {isLoading ? (
        <Block margin="0 auto" display="flex" justifyContent="center">
          <Spinner size="32px" color="black" />
        </Block>
      ) : (
        <Block className="fade-in">
          {orders
            .filter(
              (item) => activeKey === 0 || item.status === statuses[activeKey]
            )
            .map((item) => (
              <OrderItem order={item} key={item.id} />
            ))}
        </Block>
      )}
    </PageLayout>
  );
};
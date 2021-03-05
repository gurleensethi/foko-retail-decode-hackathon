import { useFirestore, useFirestoreDocData } from "reactfire";

const FirestoreDemo = () => {
  const orderRef = useFirestore().collection("orders").doc("test_order");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(orderRef);

  // easily check the loading status
  if (status === "loading") {
    return <p>Fetching order...</p>;
  }

  return (
    <div>
      <pre> {JSON.stringify(data)} </pre>
    </div>
  );
};

export default FirestoreDemo;

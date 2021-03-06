import "./App.css";
import "firebase/firestore";
import { FirebaseAppProvider } from "reactfire";
import FirestoreDemo from "./components/FirestoreDemo";
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Progress from "./components/Progress";
import Checkout from "./components/Checkout";
import ConfirmationLoading from "./components/ConfirmationLoading";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { firebaseConfig } from "./config/firebase-config";
import { ComponentShowcase } from "./pages/ComponentShowcase";
import OrderConfirmation from "./components/pages/OrderConfirmation";
import { ReatilerHome } from "./pages/retailer/RetailerHome";
import { UpcomingOrders } from "./pages/retailer/UpcomingOrders";
import ChatDrawer from "./components/ChatDrawer";
import MyCart from "./components/MyCart/myCart";
import { UpcomingOrdersDetail } from "./pages/retailer/UpcomingOrdersDetail";
import { ProcessOrder } from "./pages/retailer/ProcessOrder";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { CustomerConfirm } from "./pages/CustomerConfirm";

const engine = new Styletron();

const Home = () => {
  const history = useHistory();

  return (
    <Block
      display="flex"
      flexDirection="column"
      justifyContent="center"
      padding="16px"
    >
      <Button
        $style={{ marginBottom: "24px" }}
        onClick={() => history.push("/customer")}
      >
        Customer
      </Button>
      <Button onClick={() => history.push("/retailer")}>Retailer</Button>
    </Block>
  );
};

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Router>
            <Switch>
              <Route exact path="/">
                {/* <NavLink to="/customer">Customer</NavLink> |{" "}
                <NavLink to="/progress">Progress</NavLink> |{" "}
                <NavLink to="/component-showcase">Component Showcase</NavLink> |{" "}
                <NavLink to="/mycart">My Cart</NavLink> |{" "}
                <NavLink to="/checkout">Checkout</NavLink> |{" "}
                <NavLink to="/confirmation-loading">
                  ConfirmationLoading
                </NavLink>{" "}
                | <NavLink to="retailer">Retailer</NavLink> |{" "}
                <NavLink to="/retailer/upcoming-orders">
                  Retailer Upcoming Orders
                </NavLink>{" "}
                | <NavLink to="/order">OrderConfirmation</NavLink> |{" "}
                <NavLink to="/chat">ChatDrawer</NavLink> |{" "}
                <NavLink to="/retailer/process-order/demo_order">
                  Process Order
                </NavLink>{" "} */}
                <Home />
              </Route>
              <Route path="/mycart">
                <MyCart />
              </Route>
              <Route path="/customer/order-complete/:orderId">
                <CustomerConfirm />
              </Route>
              <Route path="/customer">
                <MyCart />
              </Route>
              <Route path="/retailer/upcoming-orders/:id">
                <UpcomingOrdersDetail />
              </Route>
              <Route path="/retailer/process-order/:orderId">
                <ProcessOrder />
              </Route>
              <Route path="/retailer/upcoming-orders">
                <UpcomingOrders />
              </Route>
              <Route path="/retailer">
                <ReatilerHome />
              </Route>
              <Route path="/firestore">
                <FirestoreDemo />
              </Route>
              <Route path="/progress/:orderId">
                <Progress />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/confirmation-loading/:orderId">
                <ConfirmationLoading />
              </Route>
              <Route path="/component-showcase">
                <ComponentShowcase />
              </Route>
              <Route path="/order">
                <OrderConfirmation />
              </Route>
              <Route path="/chat">
                <ChatDrawer />
              </Route>
            </Switch>
          </Router>
        </BaseProvider>
      </StyletronProvider>
    </FirebaseAppProvider>
  );
}

export default App;

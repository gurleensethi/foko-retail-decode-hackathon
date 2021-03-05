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
  NavLink,
} from "react-router-dom";
import CustomerHome from "./components/customerHome";
import Progress from "./components/Progress";
import Checkout from "./components/Checkout";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { firebaseConfig } from "./config/firebase-config";
import { ComponentShowcase } from "./pages/ComponentShowcase";
import OrderCompletion from "./components/pages/OrderCompletion";
import { ReatilerHome } from "./pages/retailer/RetailerHome";
import { UpcomingOrders } from "./pages/retailer/UpcomingOrders";

const engine = new Styletron();

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Router>
            <Switch>
              <Route exact path="/">
                <NavLink to="/customer">Customer</NavLink> |{" "}
                <NavLink to="/progress">Progress</NavLink> |{" "}
                <NavLink to="/component-showcase">Component Showcase</NavLink> |{" "}
                <NavLink to="/checkout">Checkout</NavLink> |{" "}
                <NavLink to="retailer">Retailer</NavLink> |{" "}
                <NavLink to="/retailer/upcoming-orders">
                  Retailer Upcoming Orders
                </NavLink>{" "}
                |{" "}
                <NavLink to="/order">Order Completion</NavLink> |{" "}
              </Route>
              <Route path="/customer">
                <CustomerHome />
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
              <Route path="/progress">
                <Progress />
              </Route>
              <Route path="/checkout">
                <Checkout />
              </Route>
              <Route path="/component-showcase">
                <ComponentShowcase />
              </Route>
              <Route path="/order">
                <OrderCompletion/>
              </Route>
            </Switch>
          </Router>
        </BaseProvider>
      </StyletronProvider>
    </FirebaseAppProvider>
  );
}

export default App;

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
import RetailerHome from "./components/retailerHome";
import Progress from "./components/Progress";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { firebaseConfig } from "./config/firebase-config";

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
                <NavLink to="retailer">Retailer</NavLink>
              </Route>
              <Route path="/customer">
                <CustomerHome />
              </Route>
              <Route path="/retailer">
                <RetailerHome />
              </Route>
              <Route path="/firestore">
                <FirestoreDemo />
              </Route>
              <Route path="/progress">
                <Progress />
              </Route>
            </Switch>
          </Router>
        </BaseProvider>
      </StyletronProvider>
    </FirebaseAppProvider>
  );
}

export default App;

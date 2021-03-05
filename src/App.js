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
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();

function App() {
  return (
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
          </Switch>
        </Router>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;

import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import CustomerHome from './components/customerHome';
import RetailerHome from './components/retailerHome';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <NavLink to="/customer">Customer</NavLink> | <NavLink to="retailer">Retailer</NavLink>
        </Route>
        <Route path="/customer">
          <CustomerHome />
        </Route>
        <Route path="/retailer">
          <RetailerHome />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

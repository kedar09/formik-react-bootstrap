import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserPage from "../../pages/User-Page/UserPage";

const RootRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserPage}></Route>
      </Switch>
    </Router>
  );
};
export default RootRoute;

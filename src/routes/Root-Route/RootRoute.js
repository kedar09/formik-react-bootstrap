import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/Home-Page/HomePage';

const RootRoute = () => {
    return (
    <Router>
      <Switch>
          <Route exact path='/' component={HomePage}></Route>
      </Switch>
    </Router>
  );
}
export default RootRoute;
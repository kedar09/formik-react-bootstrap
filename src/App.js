import React from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/Pages/Home/HomePage';
import PrivacyPage from "./components/Pages/Privacy/PrivacyPage";

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/privacy-page' component={PrivacyPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;

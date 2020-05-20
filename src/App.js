import React from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/Pages/Home/HomePage';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={HomePage}></Route> 
      </Switch>
    </Router>
  );
}

export default App;

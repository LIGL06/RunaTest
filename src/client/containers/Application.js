import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SessionActions from '../actions/Session';

// Containers
import Dashboard from './Dashboard';
import Login from './Login';

// Main Application Router
class Application extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Login }/>
          <Route path="/logout" component={ SessionActions.logout }/>
          <Route path="/" component={ Dashboard }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default hot(module)(Application);
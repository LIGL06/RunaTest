import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router';
import {SessionActions} from '../actions/session';

// Containers
import Dashboard from './Dashboard';
import Login from './Login';

// Main Application Router
class Application extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={ Login }/>
        <Route path="/logout" component={ SessionActions.logout }/>
        <Route path="/" component={ Dashboard }/>
      </Switch>
    );
  }
}

export default hot(module)(Application);

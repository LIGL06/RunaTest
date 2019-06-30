import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import axios from 'axios';
import moment from 'moment';
import confStore, { history } from './store';
import Application from './containers/Application';

moment.locale('es');
let store = confStore();

if (localStorage.session) {
  const session = JSON.parse(localStorage.session);
  store = confStore({session});
}

if (localStorage.token) {
  axios.defaults.headers.common['X-Jwt-Token'] = localStorage.token;
}


const root = document.getElementById('root');
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Application />
    </ConnectedRouter>
  </Provider>
  , root);

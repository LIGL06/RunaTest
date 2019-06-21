import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import confStore, { history } from './store';
import Application from './containers/Application';

const store = confStore();

const root = document.getElementById('root');
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Application />
    </ConnectedRouter>
  </Provider>
, root);

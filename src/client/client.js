import React from 'react';
import ReactDOM from 'react-dom';
import Application from './containers/Application';

if (localStorage.session) {
  const session = JSON.parse(localStorage.session);
  // Save session on state
}

if (localStorage.token) {
  // Set Headers on Async Router
  axios.defaults.headers.common['X-Jwt-Token'] = localStorage.token;
}

const root = document.getElementById('root');
ReactDOM.render(<Application/>, root);

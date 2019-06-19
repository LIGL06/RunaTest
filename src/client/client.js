import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import axios from 'axios';
import Application from './containers/Application';
import state from './state';

moment.locale('es');

// Restore session information if exists
if (localStorage.session) {
    const session = JSON.parse(localStorage.session);
    state.select(['session'])
        .set(session);
}

if (localStorage.token) {
    axios.defaults.headers.common['X-Jwt-Token'] = localStorage.token;
    axios.defaults.headers.common['device_session_id'] = localStorage.deviceSessionId;
}

const root = document.getElementById('root');
ReactDOM.render(<Application />, root);

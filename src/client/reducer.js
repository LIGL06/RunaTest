import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import session from './actions/session';
import employees from './actions/employees';
import records from './actions/records';

export default (history) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  session,
  employees,
  records
});

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import session from '../epics/session'

export default (history) => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  session
});

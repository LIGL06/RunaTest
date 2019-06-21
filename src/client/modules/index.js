import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counter from './counter'
import session from '../actions/session'

export default (history) => combineReducers({
    router: connectRouter(history),
    counter,
    session
})
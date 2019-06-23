import {
    combineReducers
} from 'redux'
import {
    combineEpics
} from 'redux-observable'
import {
    connectRouter
} from 'connected-react-router'
import counter from './counter'
import {
    employees,
    fetchEmployeesEpic
} from '../modules/employees'

export const rootEpic = combineEpics(
    fetchEmployeesEpic
)

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    counter,
    employees
})
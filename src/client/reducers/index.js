import {
    combineReducers
} from 'redux'
import {
    combineEpics
} from 'redux-observable'
import {
    connectRouter
} from 'connected-react-router'
import { loginStartEpic, session } from '../modules/session'
import {
    employees,
    fetchEmployeesEpic
} from '../modules/employees'

export const rootEpic = combineEpics(
    loginStartEpic,
    fetchEmployeesEpic
)

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    session,
    employees
})
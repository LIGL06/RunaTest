import {
    ajax
} from 'rxjs/ajax';
import {
    ofType
} from 'redux-observable';
import {
    GET_EMPLOYEES,
    EMPLOYEES_LOADING
} from '../reducers/employeesReducer'

export const getEmployees = action$ => action$.pipe(
    ofType(EMPLOYEES_LOADING),
    mergeMap(action =>
        ajax.getJSON(`http://localhost:9000/api/employees`).pipe(
            map(response => GET_EMPLOYEES(response))
        )
    )
)
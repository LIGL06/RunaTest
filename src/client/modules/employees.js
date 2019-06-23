import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';

const GET_EMPLOYEES = 'employees/GET_EMPLOYEES';
const GET_EMPLOYEE = 'employees/GET_EMPLOYEE';
const GET_EMPLOYEES_FULFILLED = 'employees/GET_EMPLOYEES_FULFILLED';
const GET_EMPLOYEE_FULFILLED = 'employees/GET_EMPLOYEE_FULFILLED';

export const fetchEmployees = () => ({
    type: GET_EMPLOYEES,
    payload: ''
});

export const fetchEmployee = id => ({
    type: GET_EMPLOYEE,
    payload: id
});

export const fetchEmployeeFulfilled = payload => ({
    type: GET_EMPLOYEE_FULFILLED,
    payload
});

export const fetchEmployeesFulfilled = payload => ({
    type: GET_EMPLOYEES_FULFILLED,
    payload
});

export const fetchEmployeesEpic = action$ => action$.pipe(
    ofType(GET_EMPLOYEES),
    map(action =>
        ajax.getJSON(`http://localhost:9000/api/employees`).pipe(
            map(response => fetchEmployeesFulfilled(response))
        )
    )
);


export const employees = (state = {
    loading: true
}, action) => {
    switch (action.type) {
        case GET_EMPLOYEES_FULFILLED:
            return {
                ...state,
                loading: false,
                [action.payload.login]: action.payload
            };

        default:
            return state;
    }
};
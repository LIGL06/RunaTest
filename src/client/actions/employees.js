// Deps
import axios from 'axios';
import { push } from 'connected-react-router';
// Types
const GET_EMPLOYEES = 'GET_EMPLOYEES';
const GET_EMPLOYEE = 'GET_EMPLOYEE';
const PUT_EMPLOYEE = 'PUT_EMPLOYEES';
const GET_EMPLOYEES_FULFILLED = 'GET_EMPLOYEES_FULFILLED';
const GET_EMPLOYEE_FULFILLED = 'GET_EMPLOYEE_FULFILLED';
const PUT_EMPLOYEE__FULFILLED = 'PUT_EMPLOYEE__FULFILLED';
// Actions
export const fetchEmployees = () => ( {
  type: GET_EMPLOYEES
} );

export const fetchEmployee = (id) => {
  return {
    type: GET_EMPLOYEE,
    id
  }
};

export const updateEmployee = () => {
  return {
    type: PUT_EMPLOYEE
  }
};

export const fetchEmployeeFulfilled = employee => {
  return {
    type: GET_EMPLOYEE_FULFILLED,
    employee
  }
};

export const updateEmployeeFulfilled = employee => {
  return {
    type: PUT_EMPLOYEE__FULFILLED,
    employee
  }
};

export const fetchEmployeesFulfilled = employees => ( {
  type: GET_EMPLOYEES_FULFILLED,
  employees
} );

export const getEmployees = () => async (dispatch) => {
  dispatch(fetchEmployees());
  await axios.get('/api/employees/list').then(res => {
    const employees = res.data;
    dispatch(fetchEmployeesFulfilled(employees));
  }).catch(error => console.error(error));
};

export const getEmployee = (id) => async (dispatch) => {
  dispatch(fetchEmployee(id));
  await axios.get(`/api/employees/get/${ id }`).then(res => {
    const employee = res.data;
    dispatch(fetchEmployeeFulfilled(employee));
  }).catch(error => console.error(error));
};

// Duck Update User
export const putUpdate = (action, userId) => async (dispatch) => {
  dispatch(updateEmployee());
  return axios.put(`/api/employees/update/${ userId }`, action).then(res => {
    dispatch(updateEmployeeFulfilled(res.data));
    dispatch(push('/employees'));
  }).catch(error => console.error(error));
};

export default function (state = { loading: true, employees: [], employee: {} }, action) {
  switch (action.type) {
    case GET_EMPLOYEES_FULFILLED:
      return {
        ...state,
        employees: action.employees,
        loading: false
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        loading: false
      };
    case GET_EMPLOYEE_FULFILLED:
      return {
        ...state,
        employee: { ...action.employee },
        loading: false
      };
    case GET_EMPLOYEE:
      return {
        ...state,
        loading: false
      };
    case PUT_EMPLOYEE__FULFILLED:
      return {
        ...state,
        employee: { ...action.employee },
        loading: false
      };
    case PUT_EMPLOYEE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

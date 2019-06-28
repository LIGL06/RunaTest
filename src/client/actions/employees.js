// Deps
import axios from 'axios';
// Types
const GET_EMPLOYEES = 'GET_EMPLOYEES';
const GET_EMPLOYEE = 'GET_EMPLOYEE';
const GET_EMPLOYEES_FULFILLED = 'GET_EMPLOYEES_FULFILLED';
const GET_EMPLOYEE_FULFILLED = 'GET_EMPLOYEE_FULFILLED';
// Actions
export const fetchEmployees = () => ( {
  type: GET_EMPLOYEES,
  payload: ''
} );

export const fetchEmployee = id => ( {
  type: GET_EMPLOYEE,
  payload: id
} );

export const fetchEmployeeFulfilled = payload => ( {
  type: GET_EMPLOYEE_FULFILLED,
  payload
} );

export const fetchEmployeesFulfilled = employees => ( {
  type: GET_EMPLOYEES_FULFILLED,
  payload: employees
} );

export const getEmployees = () => async (dispatch) =>{
  dispatch(fetchEmployees());
  await axios.get('/api/employees/list').then(res => {
    if(res.data.employees){
      const {employees} = res.data;
      dispatch(fetchEmployeesFulfilled(employees));
    }
  }).catch(error => console.error(error));
};

export const getEmployee = (action) => async (dispatch) =>{
  dispatch(fetchEmployees());
  await axios.get(`/api/employees/list/${action}`).then(res => {
    if(res.data.employees){
      const {employees} = res.data;
      dispatch(fetchEmployeeFulfilled(employees));
    }
  }).catch(error => console.error(error));
};

export default function(state = {loading: true, employees:[]}, action){
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
    default:
      return state;
  }
};

export const GET_EMPLOYEES = 'employees/GET_EMPLOYEES';
export const EMPLOYEES_LOADING = 'employees/EMPLOYEES_LOADING';

const initialState = {
    employees: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state,
                employees: action.payload.employees,
                loading: false
            };
        case EMPLOYEES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
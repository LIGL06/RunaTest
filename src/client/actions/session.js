import axios from 'axios';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const login = (payload) => {
  return {
  type: LOGIN_START,
  payload: {...payload}
}};

export const loginCompleted = (data) => {
  return {
  type: LOGIN_COMPLETED,
  payload: {...data}}
};

export const loginRejected = (message) => {
  return { type: LOGIN_REJECTED,
  message
} };

export const postLogin = action => async (dispatch) => {
  dispatch(login(action));
    return axios.post('/api/session/login', action).then(res => {
      dispatch(loginCompleted(res.data));
    }).catch(error => console.error(error));
}

export default function(state = {loading: true}, action = {}){
  switch (action.type) {
    case LOGIN_COMPLETED:
      return {
        ...state,
        loading: false,
        session: action.payload.session
      };
    case LOGIN_START:
      return {
        ...state,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};
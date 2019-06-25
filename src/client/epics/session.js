import axios from 'axios';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export default function session(state = {loading: true}, action = {}){
  switch (action.type) {
    case LOGIN_COMPLETED:
      return {
        ...state,
        loading: false,
        [action.payload.session]: action.payload
      };
    case LOGIN_START:
      return {
        ...state,
        loading: false
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

export function login(payload) {
  return {
  type: LOGIN_START,
  payload: {...payload}
}};

export function loginCompleted(payload){
  return {
  type: LOGIN_COMPLETED,
  payload}
};

export function loginRejected(message) {
  return { type: LOGIN_REJECTED,
  message
} };

export const loginEpic = action => {
  login(action);
  axios
    .post('/api/session', action)
    .then(res => {
        console.log(res.data);
        // axios.defaults.headers.common['X-Jwt-Token'] = localStorage.token;
        loginCompleted(res.data);
    }).catch(err => {
        console.error(err);
    });
}

import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_COMPLETED = 'SIGNUP_COMPLETED';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';

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

export const signup = (payload) => {
  return {
  type: SIGNUP_START,
  payload: {...payload}
}};

export const signupCompleted = (data) => {
  return {
  type: SIGNUP_COMPLETED,
  payload: {...data}}
};

export const signupRejected = (message) => {
  return { type: SIGNUP_REJECTED,
  message
} };

export const postLogin = action => async (dispatch) => {
  dispatch(login(action));
    return axios.post('/api/session/login', action).then(res => {
      dispatch(loginCompleted(res.data));
    }).catch(error => dispatch(loginRejected(error)));
}

export const postSignUp = action => async (dispatch) => {
  dispatch(signup(action));
    return axios.post('/api/session/register', action).then(res => {
      dispatch(signupCompleted(res.data));
    }).catch(error => dispatch(signupRejected(error)));
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
        loading: false,
        message: action.message
      }
    case SIGNUP_COMPLETED:
      return {
        ...state,
        loading: false,
        session: action.payload
      };
    case SIGNUP_START:
      return {
        ...state,
      };
    case SIGNUP_REJECTED:
      return {
        ...state,
        loading: false,
        message: action.message
      }
    default:
      return state;
  }
};
// Deps
import axios from 'axios';
import { push } from 'connected-react-router';
// Types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_COMPLETED = 'SIGNUP_COMPLETED';
// Actions
export const login = () => {
  return {
  type: LOGIN_START
}};

export const loginCompleted = session => {
  return {
  type: LOGIN_COMPLETED,
  session
  }
};

export const loginRejected = message => {
  return { type: LOGIN_REJECTED,
  message
} };

export const signup = () => {
  return {
  type: SIGNUP_START
}};

export const signupCompleted = user => {
  return {
  type: SIGNUP_COMPLETED,
  user
  }
};

export const signupRejected = message => {
  return { type: SIGNUP_REJECTED,
  message
} };
// Duck Login
export const postLogin = action => async (dispatch) => {
  dispatch(login());
    await axios.post('/api/session/login', action).then(res => {
      if(res.data.token && res.data.session){
        const {token, session} = res.data;
        dispatch(loginCompleted(session, token));
        localStorage.token = token;
        localStorage.session = JSON.stringify(session);
        axios.defaults.headers.common['X-Jwt-Token'] = token;
        dispatch(push('/'));
      }
    }).catch(error => console.error(error));
}
// Duck SignUp
export const postSignUp = action => async (dispatch) => {
  dispatch(signup());
    return axios.post('/api/session/register', action).then(res => {
      if(res.data.token && res.data.session){
        dispatch(signupCompleted(res.data));
        dispatch(push('/employees'));
      }
    }).catch(error => console.error(error));
}
// Duck Logout
export const SessionActions = {
  logout(){
  delete localStorage.session;
  delete localStorage.token;
  window.location = '/login';
  return null;
  }
}
// Reducer
export default function(state = {loading: true, session: {}, user: {}, message: null}, action){
  switch (action.type) {
    case LOGIN_COMPLETED:
      return {
        ...state,
        session: action.session,        
        loading: false,
      };
    case LOGIN_START:
      return {
        ...state,
      };
    case SIGNUP_COMPLETED:
      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case SIGNUP_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};
// Deps
import axios from 'axios';
import { push } from 'connected-react-router';
// Types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_COMPLETED = 'SIGN_UP_COMPLETED';
// Actions
export const login = () => {
  return {
    type: LOGIN_START
  }
};

export const loginCompleted = session => {
  return {
    type: LOGIN_COMPLETED,
    session
  }
};

export const signUp = () => {
  return {
    type: SIGN_UP_START
  }
};

export const signUpCompleted = newEmployee => {
  return {
    type: SIGN_UP_COMPLETED,
    newEmployee
  }
};
// Duck Login
export const postLogin = action => async (dispatch) => {
  dispatch(login());
  await axios.post('/api/session/login', action).then(res => {
    if (res.data.token && res.data.session) {
      const { token, session } = res.data;
      dispatch(loginCompleted(session, token));
      localStorage.token = token;
      localStorage.session = JSON.stringify(session);
      axios.defaults.headers.common['X-Jwt-Token'] = token;
      dispatch(push('/'));
    }
  }).catch(error => alert('Credenciales Inválidas'));
};
// Duck SignUp
export const postSignUp = action => async (dispatch) => {
  dispatch(signUp());
  return axios.post('/api/session/register', action).then(res => {
    dispatch(signUpCompleted(res.data));
    dispatch(push('/employees'));
  }).catch(error => alert('Usuario ya registrado'));
};
// Duck Logout
export const SessionActions = {
  logout() {
    delete localStorage.session;
    delete localStorage.token;
    window.location = '/login';
    return null;
  }
};
// Reducer
export default function (state = { loading: true, session: {}, newEmployee: {}, message: null }, action) {
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
    case SIGN_UP_COMPLETED:
      return {
        ...state,
        newEmployee: action.newEmployee,
        loading: false,
      };
    case SIGN_UP_START:
      return {
        ...state,
      };
    default:
      return state;
  }
};

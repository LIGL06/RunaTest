import axios from 'axios';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_COMPLETED = 'SIGNUP_COMPLETED';
export const SIGNUP_REJECTED = 'SIGNUP_REJECTED';

export const login = () => {
  return {
  type: LOGIN_START
}};

export const loginCompleted = (session, token) => {
  return {
  type: LOGIN_COMPLETED,
  session,
  token
  }
};

export const loginRejected = (message) => {
  return { type: LOGIN_REJECTED,
  message
} };

export const signup = () => {
  return {
  type: SIGNUP_START
}};

export const signupCompleted = (session, token) => {
  return {
  type: SIGNUP_COMPLETED,
  session,
  token
  }
};

export const signupRejected = (message) => {
  return { type: SIGNUP_REJECTED,
  message
} };

export const postLogin = action => async (dispatch) => {
  dispatch(login());
    return axios.post('/api/session/login', action).then(res => {
      const {token, session} = res.data;
      dispatch(loginCompleted(session, token));
      localStorage.token = token;
      localStorage.session = JSON.stringify(session);
      axios.defaults.headers.common['X-Jwt-Token'] = token;
    }).catch(error => dispatch(loginRejected(error)));
}

export const postSignUp = action => async (dispatch) => {
  dispatch(signup());
    return axios.post('/api/session/register', action).then(res => {
      const {token, session} = res.data;
      dispatch(loginCompleted(session, token));
      localStorage.token = token;
      localStorage.session = JSON.stringify(session);
      axios.defaults.headers.common['X-Jwt-Token'] = token;
    }).catch(error => dispatch(signupRejected(error)));
}

export const logout = action => async (dispatch) => {
  delete localStorage.session;
  delete localStorage.token;
  window.location = '/login';
  return null;
}

export default function(state = {loading: true, session: null, token: null}, action = {}){
  switch (action.type) {
    case LOGIN_COMPLETED:
      return {
        ...state,
        loading: false,
        session: action.session,
        token: action.token
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
        session: action.session,
        token: action.token
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
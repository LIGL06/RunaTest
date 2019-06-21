export const LOGIN_REQUESTED = 'session/LOGIN_REQUESTED'
export const LOGIN = 'session/LOGIN'
export const LOGOUT_REQUESTED = 'session/LOGOUT_REQUESTED'
export const LOGOUT = 'session/LOGOUT'

const initialState = {
  loading: false,
  email: 'luis.garcialuna@outlook.com',
  password: 'password',
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case LOGIN:
      return {
        ...state,
        token: '',
        loading: !state.loading
      }
    case LOGOUT_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
        loading: !state.loading
      }
    default:
      return state
  }
}

export const login = () => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUESTED
    })

    dispatch({
      type: LOGIN
    })
  }
}

export const loginAsync = () => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: LOGIN
      })
    }, 3000)
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUESTED
    })

    dispatch({
      type: LOGOUT
    })
  }
}

export const logoutAsync = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: LOGOUT
      })
    }, 3000)
  }
}

// const SessionActions = {
//   /**
//    * Handle a user login
//    * @param  {Object} credentials Credential data
//    * @return {Promise}
//    */
//   login(credentials) {
//     const payload = {
//       ...credentials
//     };
//   },

//   /**
//    * Handle logging out
//    * @return null
//    */
//   logout() {
//     delete localStorage.session;
//     delete localStorage.token;
//     window.location = '/login';
//     return null;
//   }
// };

// export default SessionActions;
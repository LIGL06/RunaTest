import { Observable } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

export const LOGIN_START = 'session/LOGIN_START';
export const LOGIN_COMPLETED = 'session/LOGIN_COMPLETED';
export const LOGIN_REJECTED = 'session/LOGIN_REJECTED';

export const login = (username, password) => ( {
  type: LOGIN_START,
  payload: {
    username,
    password
  }
} );

export const loginCompleted = payload => ( {
  type: LOGIN_COMPLETED,
  payload
} );

export const loginRejected = message => ( {
  type: LOGIN_REJECTED,
  message
} );

export const loginEpic = action$ => action$.pipe(
  ofType(LOGIN_START),mergeMap(action => 
    ajax.post('https://localhost:9000/api/login', action.payload, {'Content-Type': 'application/json'})
    .pipe(map(response => loginCompleted(response)))
  )
);

export const session = (state = {
  loading: true,
  session: null
}, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: false
      };
    case LOGIN_COMPLETED:
      return {
        ...state,
        loading: false,
        session: [...action.payload]
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
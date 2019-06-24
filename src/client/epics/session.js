import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export const LOGIN_START = 'session/LOGIN_START';
export const LOGIN_FULLFILLED = 'session/LOGIN_FULLFILLED';

export const login = (username, password) => ( {
  type: LOGIN_START,
  payload: {
    username,
    password
  }
} );

export const loginFullfilled = () => ( {
  type: LOGIN_FULLFILLED
} );

export const loginStartEpic = (action$) => {
  return action$.ofType(LOGIN_START)
    .map(action =>
      ajax.post(
        'http://localhost:9000/api/session',
        action.paylaod,
        { 'Content-Type': 'application/json' }
      ).pipe(
        map(response => LOGIN_FULLFILLED(response))
      )
    )
};

export const session = (state = {
  loading: true
}, action) => {
  switch (action.type) {
    case LOGIN_FULLFILLED:
      return {
        ...state,
        loading: false,
        [action.payload]: action.payload
      };
    case LOGIN_START:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

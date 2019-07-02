import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from './reducer';

export const history = createBrowserHistory();
export const middleware = [
  thunk,
  routerMiddleware(history)
];

export default function (preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        ...middleware
      ),
      compose
    )
  );
  return store;
}

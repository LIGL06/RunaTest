import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';
import rootEpic from './epics';

export const epicMiddleware = createEpicMiddleware();
export const history = createBrowserHistory();
export const middleware = [
  epicMiddleware,
  routerMiddleware(history)
];

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    applyMiddleware(
      ...middleware
    )
  );
  epicMiddleware.run(rootEpic);
  return store;
}

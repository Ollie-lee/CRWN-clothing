import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';
import rootReducer from './root-reducer';

//take an object with certain configuration settings on it
//that's why needing a function to make a middleware
const sagaMiddleware = createSagaMiddleware();

//middleware expect an array,for scalability
// if we ever needed to add more things to the middleware we can just add it to this array
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  // middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

//pass each individual saga.
//Can be used to run Sagas only after the applyMiddleware phase.
sagaMiddleware.run(rootSaga);

// persistor is essentially a persisted version of our store
export const persistor = persistStore(store);

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from "redux-persist";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer';
import {rootSagas} from './rootSagas'

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware];
middleWares.push(logger)

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleware.run(rootSagas)

export const persistor = persistStore(store)

export default { store, persistor };

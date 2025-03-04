import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers/rootreducers'; 
import rootSaga from '../saga/rootSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer, // Use rootReducer directly
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Run root saga
sagaMiddleware.run(rootSaga);

export { store };

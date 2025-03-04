import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';

// Combine reducers with correct keys
export const appReducer = combineReducers({
  auth: authReducer, // Ensure key name matches usage in store
  theme: themeReducer,
});

// Root reducer (in case of future reset logic)
export const rootReducer = (state, action) => {
  return appReducer(state, action);
};

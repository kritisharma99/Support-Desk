import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import authReducers from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth : authReducers,
  },
});

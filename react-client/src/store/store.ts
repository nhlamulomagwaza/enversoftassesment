// For the application to scale gracefully, I have decided to use Redux Toolkit for state management.
//  This allows for a more structured and maintainable approach as the application grows in complexity. 

import { configureStore } from '@reduxjs/toolkit';
import supplierReducer from './supplierSlice';

export const store = configureStore({
  reducer: {
    suppliers: supplierReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
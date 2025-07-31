// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },    
})

// Type helpers (optional but recommended)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

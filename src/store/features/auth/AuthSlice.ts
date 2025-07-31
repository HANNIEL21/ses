// src/features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: any
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: any; token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { loginSuccess, logout } = AuthSlice.actions
export default AuthSlice.reducer

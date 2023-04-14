import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState, IUser } from './types'

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<Error | string>) => {
      state.error = action.payload
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
    },
  },
})

export const { setLoading, setError, setUser } = authSlice.actions

export default authSlice.reducer

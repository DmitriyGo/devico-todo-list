export { register, login, logout, checkAuth } from './actions'
export {
  default as authReducer,
  setError,
  setLoading,
  setUser,
  setAccessToken,
} from './authSlice'

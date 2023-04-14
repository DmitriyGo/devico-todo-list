import { ILoginDTO, IRegisterDTO } from './types'

export const AuthActionTypes = {
  register: 'REGISTER',
  login: 'LOGIN',
  logout: 'LOGOUT',
  checkAuth: 'CHECK_AUTH',
}

export const register = (payload: IRegisterDTO) => {
  return {
    type: AuthActionTypes.register,
    payload,
  }
}

export const login = (payload: ILoginDTO) => {
  return {
    type: AuthActionTypes.login,
    payload,
  }
}

export const logout = () => {
  return {
    type: AuthActionTypes.logout,
  }
}

export const checkAuth = () => {
  return {
    type: AuthActionTypes.checkAuth,
  }
}

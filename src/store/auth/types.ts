const API_URL = 'auth'

export interface IUser {
  id: string
  login: string
}

export interface ILoginDTO {
  login: string
  password: string
}

export interface IRegisterFormDTO {
  login: string
  password: string
  confirm_password: string
}

export interface IRegisterDTO {
  login: string
  password: string
}

export interface IAuthResponse {
  data: {
    accessToken: string
    refreshToken: string
    user: IUser
  }
}

export const registerFormToRegisterDto = (
  data: IRegisterFormDTO,
): IRegisterDTO => {
  return {
    login: data.login,
    password: data.password,
  }
}

export const authEndpoints = {
  register: () => `/${API_URL}/register`,
  login: () => `/${API_URL}/login`,
  logout: () => `/${API_URL}/logout`,
  refresh: () => `/${API_URL}/refresh`,
}

export interface AuthState {
  user: IUser | null
  accessToken: string | null
  isLoading: boolean
  error: Error | string | null
}

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

import { logout } from '@/store/auth/actions'
import { setAccessToken } from '@/store/auth/authSlice'
import { RootStore } from '@/store/store'

type AccessToken = string | null

interface TokenRefreshResponse {
  accessToken: string
}

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}

const httpClient: AxiosInstance = axios.create(defaultConfig)

export const setupHttpClient = (store: RootStore) => {
  httpClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const accessToken: AccessToken | undefined =
        store.getState().auth.accessToken
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
  )

  httpClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError): Promise<AxiosResponse> => {
      const { response } = error

      if (response && response.status === 401) {
        try {
          const refreshResponse: AxiosResponse<TokenRefreshResponse> =
            await httpClient.post<TokenRefreshResponse>(
              `${import.meta.env.VITE_PUBLIC_API_URL}/auth/refresh`,
            )

          const newAccessToken: string = refreshResponse.data.accessToken

          store.dispatch(setAccessToken(newAccessToken))

          const originalRequest: InternalAxiosRequestConfig | undefined =
            error.config

          if (!originalRequest) return axios(defaultConfig)

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axios(originalRequest)
        } catch (error) {
          store.dispatch(logout())
          throw new Error('User is not authenticated')
        }
      } else {
        throw new Error('An error occurred while processing your request.')
      }
    },
  )
}

export default httpClient

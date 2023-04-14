import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

import appCookiesStorage from './appCookies'

type AccessToken = string | null
type RefreshToken = string | null

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

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken: AccessToken | undefined =
      appCookiesStorage.getItem('accessToken')
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
      const refreshToken: RefreshToken | undefined =
        appCookiesStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('User is not authenticated')
      }

      try {
        const refreshResponse: AxiosResponse<TokenRefreshResponse> =
          await axios.post<TokenRefreshResponse>(
            `${import.meta.env.VITE_PUBLIC_API_URL}/auth/refresh`,
            { refreshToken },
          )
        const newAccessToken: string = refreshResponse.data.accessToken
        appCookiesStorage.setItem('accessToken', newAccessToken)

        const originalRequest: InternalAxiosRequestConfig | undefined =
          error.config

        if (!originalRequest) return axios(defaultConfig)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axios(originalRequest)
      } catch (error) {
        throw new Error('User is not authenticated')
      }
    } else {
      throw new Error('An error occurred while processing your request.')
    }
  },
)

export const isHttpClientError = axios.isAxiosError
export type ApiResponse<Response> = Promise<AxiosResponse<Response>>

export default httpClient

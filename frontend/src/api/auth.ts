import api from "./client"

interface LoginPayload {
  username: string
  password: string
}

interface TokenResponse {
  access: string
  refresh: string
}

export const login = async (payload: LoginPayload): Promise<TokenResponse> => {
  const { data } = await api.post<TokenResponse>("/auth/login/", payload)
  return data
}

export const refreshToken = async (refresh: string): Promise<{ access: string }> => {
  const { data } = await api.post<{ access: string }>("/auth/refresh/", { refresh })
  return data
}
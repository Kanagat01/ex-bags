import { create } from "zustand"

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

interface AuthState {
  accessToken: string | null
  isAuthenticated: boolean
  setTokens: (access: string, refresh: string) => void
  logout: () => void
}

const getInitialState = () => {
  if (typeof window === "undefined") return { accessToken: null, isAuthenticated: false }
  const token = localStorage.getItem("access_token")
  return {
    accessToken: token,
    isAuthenticated: !!token,
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),

  setTokens: (access, refresh) => {
    localStorage.setItem("access_token", access)
    localStorage.setItem("refresh_token", refresh)
    setCookie("access_token", access)
    set({ accessToken: access, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    deleteCookie("access_token")
    set({ accessToken: null, isAuthenticated: false })
  },
}))
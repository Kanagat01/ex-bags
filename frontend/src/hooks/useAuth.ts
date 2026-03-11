import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store"
import { login } from "@/api"

export const useAuth = () => {
  const router = useRouter()
  const { setTokens, logout, isAuthenticated } = useAuthStore()

  const handleLogin = async (username: string, password: string) => {
    const data = await login({ username, password })
    setTokens(data.access, data.refresh)
    router.push("/admin/applications")
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  return { handleLogin, handleLogout, isAuthenticated }
}
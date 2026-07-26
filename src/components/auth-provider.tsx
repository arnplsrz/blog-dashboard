import { useCallback, useEffect, useState, type ReactNode } from "react"
import { Navigate, Outlet } from "react-router"

import { AuthContext, TOKEN_KEY, useAuth, type User } from "@/lib/auth-context"
import { Toaster, toast } from "sonner"

const API_URL = import.meta.env.VITE_API_URL

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  )
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(() =>
    Boolean(localStorage.getItem(TOKEN_KEY))
  )

  const login = useCallback((token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token)
    setToken(token)
    setUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (!stored) return

    const controller = new AbortController()
    const { signal } = controller

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${stored}` },
          signal
        })

        if (!response.ok) {
          logout()
          toast("Your session has expired. Please sign in again.")
          return
        }

        const { user } = await response.json()
        setUser(user)
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return
        toast.error("Could not reach the server")
      } finally {
        if (!signal.aborted) setIsLoading(false)
      }
    }

    fetchUser()

    return () => {
      controller.abort()
    }
  }, [logout])

  return (
    <AuthContext value={{ user, token, isLoading, login, logout }}>
      {children}
      <Toaster />
    </AuthContext>
  )
}

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

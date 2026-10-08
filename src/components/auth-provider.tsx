import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { API_URL } from "@/lib/api"
import { AuthContext, type User } from "@/lib/auth-context"
import { Toaster, toast } from "sonner"

type Session = { accessToken: string; user: User }

let refreshing: Promise<Session | null> | null = null

function refreshSession() {
  refreshing ??= fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
    signal: AbortSignal.timeout(5000),
  })
    .then((response) => (response.ok ? response.json() : null))
    .finally(() => {
      refreshing = null
    })

  return refreshing
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const tokenRef = useRef<string | null>(null)

  const login = useCallback((token: string, user: User) => {
    tokenRef.current = token
    setToken(token)
    setUser(user)
  }, [])

  const logout = useCallback(async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {})
    tokenRef.current = null
    setToken(null)
    setUser(null)
  }, [])

  const authFetch = useCallback(
    async (input: string, init: RequestInit = {}) => {
      const send = (accessToken: string | null) => {
        const headers = new Headers(init.headers)
        if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`)
        return fetch(input, { ...init, headers })
      }

      const res = await send(tokenRef.current)
      if (res.status !== 401) return res

      const session = await refreshSession().catch(() => null)
      if (!session) {
        logout()
        return res
      }

      login(session.accessToken, session.user)
      return send(session.accessToken)
    },
    [login, logout]
  )

  useEffect(() => {
    let active = true

    refreshSession()
      .then((session) => {
        if (active && session) login(session.accessToken, session.user)
      })
      .catch((error) => {
        toast.error(
          error.name === "TimeoutError"
            ? "The server took too long to respond"
            : "Could not reach the server"
        )
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [login])

  return (
    <AuthContext value={{ user, token, isLoading, login, logout, authFetch }}>
      {children}
      <Toaster />
    </AuthContext>
  )
}

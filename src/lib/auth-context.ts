import { createContext, useContext } from "react"

export type User = {
  id: string
  email: string
  name: string | null
  role: "USER" | "AUTHOR"
}

export type AuthValue = {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

export const TOKEN_KEY = "token"

export const AuthContext = createContext<AuthValue | null>(null)

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error("useAuth must be used within <AuthProvider>")
  return value
}

import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AUTH_KEY = 'mcp_docs_auth'

export interface AuthUser {
  id: string
  username: string
  email: string
}

interface StoredAuth {
  token: string
  user: AuthUser
}

interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  login: (usernameOrEmail: string, password: string) => Promise<{ ok: boolean; error?: string }>
  signup: (username: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
  getAuthHeader: () => string | null
}

const AuthContext = createContext<AuthState | null>(null)

function loadStored(): StoredAuth | null {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data?.token || !data?.user?.id) return null
    return { token: data.token, user: data.user }
  } catch {
    return null
  }
}

function store(auth: StoredAuth) {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(auth))
}

function clearStored() {
  sessionStorage.removeItem(AUTH_KEY)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<StoredAuth | null>(loadStored)

  useEffect(() => {
    setStored(loadStored())
  }, [])

  const login = useCallback(async (usernameOrEmail: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameOrEmail,
          email: usernameOrEmail,
          password,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return { ok: false, error: data.error || 'Login failed' }
      const auth = { token: data.token, user: data.user }
      store(auth)
      setStored(auth)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error' }
    }
  }, [])

  const signup = useCallback(async (username: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return { ok: false, error: data.error || 'Sign up failed' }
      const auth = { token: data.token, user: data.user }
      store(auth)
      setStored(auth)
      return { ok: true }
    } catch {
      return { ok: false, error: 'Network error' }
    }
  }, [])

  const logout = useCallback(() => {
    clearStored()
    setStored(null)
  }, [])

  const getAuthHeader = useCallback(() => (stored?.token ? `Bearer ${stored.token}` : null), [stored])

  const value: AuthState = {
    isAuthenticated: !!stored,
    user: stored?.user ?? null,
    login,
    signup,
    logout,
    getAuthHeader,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

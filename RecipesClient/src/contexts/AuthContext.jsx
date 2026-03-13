import * as React from 'react'

import apiClient, { TOKEN_STORAGE_KEY } from '../lib/apiClient'
import { toast } from '../hooks/use-toast'

const USER_STORAGE_KEY = 'auth_user'

const AuthContext = React.createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [authReady, setAuthReady] = React.useState(false)

  React.useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
    const storedUser = localStorage.getItem(USER_STORAGE_KEY)

    if (storedToken) {
      setToken(storedToken)
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem(USER_STORAGE_KEY)
      }
    }

    setAuthReady(true)
  }, [])

  const persistAuth = (authToken, authUser) => {
    if (authToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, authToken)
      setToken(authToken)
    }

    if (authUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser))
      setUser(authUser)
    }
  }

  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      const { token: authToken, user: authUser } = response.data
      persistAuth(authToken, authUser)
      toast({ title: 'Welcome back', description: 'You are now signed in.' })
      return { ok: true }
    } catch (error) {
      const message =
        error?.response?.data?.message || 'Unable to sign in. Please try again.'
      toast({ title: 'Sign in failed', description: message, variant: 'destructive' })
      return { ok: false, error }
    } finally {
      setLoading(false)
    }
  }

  const register = async ({ username, email, password }) => {
    setLoading(true)
    try {
      const response = await apiClient.post('/auth/register', {
        username,
        email,
        password,
        firstName: '',
        lastName: '',
      })
      const { token: authToken, user: authUser } = response.data
      persistAuth(authToken, authUser)
      toast({ title: 'Account created', description: 'Welcome to Recipe Vault.' })
      return { ok: true }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        'Unable to register. Please check your details.'
      toast({
        title: 'Registration failed',
        description: message,
        variant: 'destructive',
      })
      return { ok: false, error }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setToken(null)
    setUser(null)
    toast({ title: 'Signed out', description: 'See you next time.' })
  }

  const value = {
    user,
    token,
    loading,
    authReady,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

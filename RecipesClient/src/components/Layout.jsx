import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Toaster } from './ui/toaster'
import { useAuth } from '../contexts/AuthContext'

export default function Layout({ children, title = 'Recipe Vault', actions }) {
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Card className="sticky top-0 z-40 rounded-none border-x-0 border-t-0 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 rounded-full bg-slate-900 text-slate-50 grid place-items-center text-sm font-semibold">
              RV
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Recipes
              </p>
              <h1 className="text-lg font-semibold">{title}</h1>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {actions}
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center gap-3 mr-2 hover:opacity-80 transition-opacity">
                  <div className="h-8 w-8 rounded-full bg-slate-100 grid place-items-center text-xs font-medium text-slate-600 border border-slate-200">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium text-slate-700 hidden sm:block">
                    {user?.name || 'User'}
                  </span>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
                <Button size="sm" asChild>
                  <Link to="/recipes/new">Upload Recipe</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      <Toaster />
    </div>
  )
}

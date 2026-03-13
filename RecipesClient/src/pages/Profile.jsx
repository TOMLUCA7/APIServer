import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout'
import RecipeGrid from '../components/RecipeGrid'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import apiClient from '../lib/apiClient'
import { toast } from '../hooks/use-toast'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user, isAuthenticated, authReady } = useAuth()
  const navigate = useNavigate()
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (authReady && !isAuthenticated) {
      navigate('/login')
    }
  }, [authReady, isAuthenticated, navigate])

  React.useEffect(() => {
    let isMounted = true

    const fetchMyRecipes = async () => {
      if (!isAuthenticated) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const response = await apiClient.get('/recipes/my-recipes')
        if (isMounted) {
          setRecipes(response.data || [])
        }
      } catch (error) {
        const message =
          error?.response?.status === 404
            ? "You haven't uploaded any recipes yet."
            : 'Unable to load your recipes.'
        toast({ title: 'Could not load recipes', description: message })
        if (isMounted) {
          setRecipes([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMyRecipes()

    return () => {
      isMounted = false
    }
  }, [isAuthenticated])

  return (
    <Layout title="Profile">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Your profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-700">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {user?.name || 'User'}
                </p>
                <p className="text-sm text-slate-500">{user?.email || ''}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">Your recipes</h3>
            <p className="text-sm text-slate-500">
              Recipes you have uploaded.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-64 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
                />
              ))}
            </div>
          ) : recipes.length > 0 ? (
            <RecipeGrid recipes={recipes} />
          ) : (
            <Card>
              <CardContent className="py-10 text-center text-sm text-slate-500">
                You have not uploaded any recipes yet.
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </Layout>
  )
}

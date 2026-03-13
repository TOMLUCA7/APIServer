import * as React from 'react'

import Layout from '../components/Layout'
import RecipeGrid from '../components/RecipeGrid'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import apiClient from '../lib/apiClient'
import { toast } from '../hooks/use-toast'

export default function Home() {
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let isMounted = true

    const fetchRecipes = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get('/recipes')
        if (isMounted) {
          setRecipes(response.data || [])
        }
      } catch (error) {
        toast({
          title: 'Failed to load recipes',
          description: 'Please refresh or try again later.',
          variant: 'destructive',
        })
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchRecipes()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Layout>
      <div className="grid gap-8">
        <Card className="overflow-hidden bg-linear-to-br from-white via-slate-50 to-slate-100">
          <CardContent className="grid gap-6 p-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Recipe Management
              </p>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                Organize, cook, and share your favorite recipes.
              </h2>
              <p className="text-sm text-slate-600 md:text-base">
                Discover new dishes, upload your own creations, and keep track of
                every bite with a clean, modern recipe vault.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button>Explore Recipes</Button>
                <Button variant="outline">Upload New</Button>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-3">
                <div className="h-2 w-16 rounded-full bg-slate-200" />
                <div className="h-3 w-full rounded-full bg-slate-100" />
                <div className="h-3 w-4/5 rounded-full bg-slate-100" />
                <div className="h-3 w-3/5 rounded-full bg-slate-100" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Favorites
                  </p>
                  <p className="text-lg font-semibold text-slate-900">12 saved</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    New ideas
                  </p>
                  <p className="text-lg font-semibold text-slate-900">5 this week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Latest recipes</h3>
              <p className="text-sm text-slate-500">
                Fresh ideas from your community.
              </p>
            </div>
            <Button variant="ghost">View all</Button>
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
          ) : (
            <RecipeGrid recipes={recipes} />
          )}
        </section>
      </div>
    </Layout>
  )
}

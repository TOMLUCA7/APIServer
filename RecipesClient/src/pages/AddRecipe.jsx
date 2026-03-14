import * as React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import Layout from '../components/Layout'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import apiClient from '../lib/apiClient'
import { toast } from '../hooks/use-toast'
import { useAuth } from '../contexts/AuthContext'

const difficultyOptions = ['easy', 'medium', 'hard']

export default function AddRecipe() {
  const { isAuthenticated, authReady } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const [submitting, setSubmitting] = React.useState(false)
  const [formState, setFormState] = React.useState({
    title: '',
    description: '',
    cookingTime: '',
    servings: '',
    difficulty: 'easy',
    ingredients: '',
    instructions: '',
    isPublic: true,
    imageUrl: '',
  })
  const [imageFile, setImageFile] = React.useState(null)

  React.useEffect(() => {
    if (authReady && !isAuthenticated) {
      navigate('/login')
    }
  }, [authReady, isAuthenticated, navigate])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (event) => {
    setImageFile(event.target.files?.[0] || null)
  }

  const parseLines = (value) =>
    value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setSubmitting(true)
    try {
      const payload = new FormData()
      payload.append('title', formState.title)
      payload.append('description', formState.description)
      payload.append('cookingTime', formState.cookingTime)
      payload.append('servings', formState.servings)
      payload.append('difficulty', formState.difficulty)
      payload.append(
        'ingredients',
        JSON.stringify(parseLines(formState.ingredients)),
      )
      payload.append(
        'instructions',
        JSON.stringify(parseLines(formState.instructions)),
      )
      if (formState.imageUrl) {
        payload.append('imageUrl', formState.imageUrl)
      }
      if (imageFile) {
        payload.append('image', imageFile)
      }

      if (isEditMode) {
        await apiClient.put(`/recipes/${id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await apiClient.post('/recipes', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }

      toast({
        title: isEditMode ? 'Recipe updated' : 'Recipe created',
        description: isEditMode ? 'Your changes were saved.' : 'Your recipe is live.',
      })
      navigate('/profile')
    } catch (error) {
      const message =
        error?.response?.data?.error || 'Unable to create the recipe.'
      toast({ title: 'Upload failed', description: message, variant: 'destructive' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout title={isEditMode ? 'Update Recipe' : 'Add Recipe'}>
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? 'Update recipe' : 'New recipe'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Title</label>
                  <Input
                    name="title"
                    placeholder="Recipe title"
                    value={formState.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Difficulty
                  </label>
                  <div className="flex gap-2">
                    {difficultyOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormState((prev) => ({
                            ...prev,
                            difficulty: option,
                          }))
                        }
                        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                          formState.difficulty === option
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 text-slate-600 hover:border-slate-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                  placeholder="Short summary of the recipe"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Cooking time (minutes)
                  </label>
                  <Input
                    name="cookingTime"
                    type="number"
                    min="0"
                    value={formState.cookingTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Servings
                  </label>
                  <Input
                    name="servings"
                    type="number"
                    min="1"
                    value={formState.servings}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Ingredients (one per line)
                  </label>
                  <textarea
                    name="ingredients"
                    value={formState.ingredients}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                    placeholder="2 eggs&#10;1 tbsp olive oil&#10;Salt"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Instructions (one step per line)
                  </label>
                  <textarea
                    name="instructions"
                    value={formState.instructions}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                    placeholder="Preheat the oven...&#10;Mix ingredients...&#10;Bake for 20 minutes."
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Upload image
                  </label>
                  <Input type="file" accept="image/*" onChange={handleFileChange} />
                  <p className="text-xs text-slate-500">
                    Upload a photo or paste a URL below.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Image URL (optional)
                  </label>
                  <Input
                    name="imageUrl"
                    value={formState.imageUrl}
                    onChange={handleChange}
                    placeholder="https://res.cloudinary.com/..."
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formState.isPublic}
                    onChange={handleChange}
                  />
                  Public recipe
                </label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Uploads to Cloudinary</Badge>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save recipe'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
  const toLines = (value) => {
    if (Array.isArray(value)) return value.join('\n')
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) return parsed.join('\n')
      } catch (error) {
        return value
      }
    }
    return ''
  }

  React.useEffect(() => {
    if (!isEditMode) return
    const recipe = location.state?.recipe
    if (!recipe) return
    setFormState((prev) => ({
      ...prev,
      title: recipe.title || '',
      description: recipe.description || '',
      cookingTime: recipe.cookingTime ?? '',
      servings: recipe.servings ?? '',
      difficulty: recipe.difficulty || 'easy',
      ingredients: toLines(recipe.ingredients),
      instructions: toLines(recipe.instructions),
      imageUrl: recipe.imageUrl || recipe.image || recipe.photoUrl || '',
    }))
  }, [isEditMode, location.state])

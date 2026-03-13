import * as React from 'react'

import RecipeCard from './RecipeCard'
import { Badge } from './ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { API_BASE_URL } from '../lib/apiClient'

export default function RecipeGrid({ recipes = [] }) {
  const [selectedRecipe, setSelectedRecipe] = React.useState(null)

  const parseList = (value) => {
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : []
      } catch (error) {
        return []
      }
    }
    return []
  }

  const getOwnerLabel = (recipe) =>
    recipe?.user?.username ||
    recipe?.user?.name ||
    recipe?.username ||
    recipe?.userName ||
    recipe?.owner?.username ||
    recipe?.owner?.name ||
    'Unknown'

  const getImageSrc = (recipe) => {
    const image =
      recipe?.imageUrl || recipe?.image || recipe?.photoUrl || null
    if (!image) {
      return 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80'
    }
    if (
      image.startsWith('http://') ||
      image.startsWith('https://') ||
      image.startsWith('data:') ||
      image.startsWith('blob:')
    ) {
      return image
    }
    return `${API_BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`
  }

  if (!recipes.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
        No recipes yet. Check back soon.
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id || recipe._id || recipe.title}
            recipe={recipe}
            onClick={() => setSelectedRecipe(recipe)}
          />
        ))}
      </div>

      <Dialog
        open={Boolean(selectedRecipe)}
        onOpenChange={() => setSelectedRecipe(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedRecipe && (
            <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={getImageSrc(selectedRecipe)}
                  alt={selectedRecipe?.title || 'Recipe'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedRecipe?.title || 'Untitled recipe'}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedRecipe?.description || 'No description provided.'}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {selectedRecipe?.difficulty || 'Unknown'}
                  </Badge>
                  <Badge variant="outline">
                    {selectedRecipe?.cookingTime || 'N/A'} min
                  </Badge>
                  <Badge variant="outline">
                    Serves {selectedRecipe?.servings || 'N/A'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      Ingredients
                    </h4>
                    <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
                      {parseList(selectedRecipe?.ingredients).map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      Instructions
                    </h4>
                    <ol className="mt-2 list-decimal pl-5 text-sm text-slate-600">
                      {parseList(selectedRecipe?.instructions).map((step, index) => (
                        <li key={`${step}-${index}`}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 text-xs text-slate-500">
                  Uploaded by {getOwnerLabel(selectedRecipe)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

import RecipeCard from './RecipeCard'

export default function RecipeGrid({ recipes = [] }) {
  if (!recipes.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
        No recipes yet. Check back soon.
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id || recipe._id || recipe.title} recipe={recipe} />
      ))}
    </div>
  )
}

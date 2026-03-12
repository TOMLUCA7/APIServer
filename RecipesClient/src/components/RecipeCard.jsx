import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

const fallbackImage =
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80'

export default function RecipeCard({ recipe }) {
  const image = recipe?.imageUrl || recipe?.image || recipe?.photoUrl || fallbackImage
  const title = recipe?.title || 'Untitled recipe'
  const difficulty = recipe?.difficulty || 'Unknown'
  const cookTime = recipe?.cookTime || recipe?.time || 'N/A'

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base md:text-lg">{title}</CardTitle>
          <Badge variant="secondary">{difficulty}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600">Cook time: {cookTime}</p>
      </CardContent>
      <CardFooter className="text-xs text-slate-400">
        Tap for details
      </CardFooter>
    </Card>
  )
}

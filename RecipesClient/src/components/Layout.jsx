import { Button } from './ui/button'
import { Card } from './ui/card'
import { Toaster } from './ui/toaster'

export default function Layout({ children, title = 'Recipe Vault', actions }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Card className="sticky top-0 z-40 rounded-none border-x-0 border-t-0 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-900 text-slate-50 grid place-items-center text-sm font-semibold">
              RV
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Recipes
              </p>
              <h1 className="text-lg font-semibold">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <Button variant="outline">Login</Button>
            <Button>Upload Recipe</Button>
          </div>
        </div>
      </Card>
      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      <Toaster />
    </div>
  )
}

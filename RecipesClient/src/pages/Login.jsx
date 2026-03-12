import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { login, loading } = useAuth()
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(formState)
  }

  return (
    <Layout title="Welcome back">
      <div className="mx-auto w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-slate-900 hover:underline underline-offset-4">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

import { useState } from 'react'
import { Utensils, Mail, Lock, ArrowRight } from 'lucide-react'

function Login({ onLogin, onSwitchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    // Simple validation - in real app, this would be an API call
    onLogin({ email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 animate-scale-in border border-white/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 group cursor-pointer">
            <Utensils className="w-10 h-10 text-violet-600 group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all">FoodOrder</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 animate-fade-in-down">Welcome Back</h2>
          <p className="text-gray-600 mt-2 animate-fade-in-up">Sign in to continue ordering</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all focus:scale-[1.02] hover:border-violet-300 bg-white/80 backdrop-blur"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all focus:scale-[1.02] hover:border-violet-300 bg-white/80 backdrop-blur"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer hover:text-violet-600 transition-colors">
              <input type="checkbox" className="w-4 h-4 text-violet-600 rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-violet-600 hover:text-fuchsia-600 font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
          >
            Sign In
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-violet-600 hover:text-fuchsia-600 font-medium transition-colors hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

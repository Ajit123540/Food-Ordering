import { useState } from 'react'
import { Utensils, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react'

function Signup({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    // Simple validation - in real app, this would be an API call
    onSignup({ name, email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 animate-scale-in border border-white/20">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 group cursor-pointer">
            <Utensils className="w-10 h-10 text-violet-600 group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all">FoodOrder</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 animate-fade-in-down">Create Account</h2>
          <p className="text-gray-600 mt-2 animate-fade-in-up">Sign up to start ordering</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all focus:scale-[1.02] hover:border-violet-300 bg-white/80 backdrop-blur"
                placeholder="John Doe"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all focus:scale-[1.02] hover:border-violet-300 bg-white/80 backdrop-blur"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-3 rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:shadow-lg active:scale-95"
          >
            Create Account
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-violet-600 hover:text-fuchsia-600 font-medium transition-colors hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup

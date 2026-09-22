import { useState } from 'react'
import { ShoppingCart, Menu, X, Utensils, LogOut, User } from 'lucide-react'
import Login from './Login'
import Signup from './Signup'

const menuItems = [
  { id: 1, name: 'Classic Burger', description: 'Juicy beef patty with fresh vegetables', price: 299, category: 'Burgers', image: '🍔' },
  { id: 2, name: 'Cheese Burger', description: 'Double cheese with crispy bacon', price: 349, category: 'Burgers', image: '🍔' },
  { id: 3, name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, and basil', price: 399, category: 'Pizza', image: '🍕' },
  { id: 4, name: 'Pepperoni Pizza', description: 'Loaded with spicy pepperoni', price: 449, category: 'Pizza', image: '🍕' },
  { id: 5, name: 'Caesar Salad', description: 'Crisp romaine with parmesan and croutons', price: 249, category: 'Salads', image: '🥗' },
  { id: 6, name: 'Greek Salad', description: 'Fresh vegetables with feta cheese', price: 279, category: 'Salads', image: '🥗' },
  { id: 7, name: 'Chicken Wings', description: 'Crispy wings with your choice of sauce', price: 349, category: 'Appetizers', image: '🍗' },
  { id: 8, name: 'French Fries', description: 'Golden crispy fries', price: 149, category: 'Sides', image: '🍟' },
  { id: 9, name: 'Chocolate Shake', description: 'Rich and creamy chocolate milkshake', price: 179, category: 'Drinks', image: '🥤' },
  { id: 10, name: 'Fresh Lemonade', description: 'Refreshing homemade lemonade', price: 129, category: 'Drinks', image: '🍋' },
]

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [currentPage, setCurrentPage] = useState('login') // 'login', 'signup', 'home'
  const [user, setUser] = useState(null)

  const categories = ['All', 'Burgers', 'Pizza', 'Salads', 'Appetizers', 'Sides', 'Drinks']

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0)

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  const handleCheckout = (e) => {
    e.preventDefault()
    setOrderPlaced(true)
    setCart([])
    setShowCheckout(false)
    setTimeout(() => setOrderPlaced(false), 3000)
  }

  const handleLogin = (credentials) => {
    // Simulate login - in real app, this would be an API call
    setUser({ name: credentials.email.split('@')[0], email: credentials.email })
    setCurrentPage('home')
  }

  const handleSignup = (userData) => {
    // Simulate signup - in real app, this would be an API call
    setUser({ name: userData.name, email: userData.email })
    setCurrentPage('home')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('login')
    setCart([])
  }

  // Show login page
  if (currentPage === 'login') {
    return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />
  }

  // Show signup page
  if (currentPage === 'signup') {
    return <Signup onSignup={handleSignup} onSwitchToLogin={() => setCurrentPage('login')} />
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 flex items-center justify-center animate-fade-in">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-12 text-center animate-scale-in border border-white/20">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600">Your delicious food is on its way.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-xl sticky top-0 z-50 animate-fade-in-down border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Utensils className="w-8 h-8 text-violet-600 group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent group-hover:from-violet-500 group-hover:to-fuchsia-500 transition-all">FoodOrder</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-to-r from-violet-100 to-fuchsia-100 px-4 py-2 rounded-xl hover:from-violet-200 hover:to-fuchsia-200 transition-all cursor-pointer shadow-md">
              <User className="w-5 h-5 text-violet-600" />
              <span className="font-medium text-gray-800">{user?.name || 'Guest'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6 animate-fade-in">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200'
                  : 'bg-white/80 backdrop-blur text-gray-700 hover:bg-gradient-to-r hover:from-violet-100 hover:to-fuchsia-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up group border border-white/20"
            >
              <div className="h-48 bg-gradient-to-br from-violet-100 via-purple-100 to-fuchsia-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-200 via-purple-200 to-fuchsia-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-8xl relative z-10 group-hover:scale-110 transition-transform duration-300">{item.image}</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-violet-600 transition-colors">{item.name}</h3>
                  <span className="bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-600 px-2 py-1 rounded-full text-sm font-medium group-hover:from-violet-600 group-hover:to-fuchsia-600 group-hover:text-white transition-all">
₹{item.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-2 rounded-xl transition-all duration-300 font-medium hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 animate-fade-in"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative bg-white/90 backdrop-blur-xl w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right border-l border-white/20">
            <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-violet-50 to-fuchsia-50">
              <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-500 animate-fade-in">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      style={{ animationDelay: `${index * 50}ms` }}
                      className="flex items-center gap-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-3 rounded-xl hover:from-violet-100 hover:to-fuchsia-100 transition-all animate-fade-in-up border border-white/20"
                    >
                      <span className="text-3xl hover:scale-110 transition-transform">{item.image}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-violet-600 font-medium">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gradient-to-r from-violet-100 to-fuchsia-100 hover:from-violet-200 hover:to-fuchsia-200 hover:text-violet-600 rounded-full transition-all font-medium active:scale-90"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gradient-to-r from-violet-100 to-fuchsia-100 hover:from-violet-200 hover:to-fuchsia-200 hover:text-violet-600 rounded-full transition-all font-medium active:scale-90"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t bg-gradient-to-r from-violet-50 to-fuchsia-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-800">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">₹{cartTotal}</span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-3 rounded-xl transition-all duration-300 font-medium hover:shadow-lg active:scale-95"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 animate-fade-in"
            onClick={() => setShowCheckout(false)}
          />
          <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in border border-white/20">
            <div className="p-6 border-b flex items-center justify-between bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-t-2xl">
              <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Checkout</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors hover:rotate-90 duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCheckout} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all focus:scale-[1.02] hover:border-violet-300 bg-white/80 backdrop-blur"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all focus:scale-[1.02] hover:border-violet-300 bg-white/80 backdrop-blur"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  required
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none transition-all focus:scale-[1.02] hover:border-violet-300 bg-white/80 backdrop-blur"
                  placeholder="123 Main St, City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none transition-all focus:scale-[1.02] hover:border-violet-300 bg-white/80 backdrop-blur"
                  placeholder="Any special requests..."
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-800">Order Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">₹{cartTotal}</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-3 rounded-xl transition-all duration-300 font-medium hover:shadow-lg active:scale-95"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

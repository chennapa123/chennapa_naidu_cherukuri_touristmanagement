import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Listen for storage changes (when user logs in from other page or tab)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user')
      if (updatedUser) {
        setUser(JSON.parse(updatedUser))
      } else {
        setUser(null)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-2 border-orange-400">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-xl">✈</span>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent hidden sm:inline whitespace-nowrap">
              Book Tour
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <Link to="/destinations" className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group whitespace-nowrap">
              Destinations
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/packages" className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group whitespace-nowrap">
              Packages
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {/* How it works link removed - merged into About */}
            <Link to="/bookings" className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group whitespace-nowrap">
              Bookings
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group whitespace-nowrap">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group whitespace-nowrap">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user && user.role === 'admin' && (
              <Link to="/admin/users" className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group whitespace-nowrap">
                Admin
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="text-gray-800 font-medium hidden sm:block text-sm whitespace-nowrap">{user.name || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors hidden sm:block whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:shadow-lg hover:shadow-orange-300/50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 flex-shrink-0">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-orange-200 bg-orange-50">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link to="/destinations" className="block text-gray-700 hover:text-orange-600 font-medium transition-colors py-2">
              Destinations
            </Link>
            <Link to="/packages" className="block text-gray-700 hover:text-orange-600 font-medium transition-colors py-2">
              Packages
            </Link>
            {/* Solutions link removed */}
            {/* How it works link removed - merged into About */}
            <Link to="/bookings" className="block text-gray-700 hover:text-orange-600 font-medium transition-colors py-2">
              Bookings
            </Link>
            {user && user.role === 'admin' && (
              <Link to="/admin/users" className="block text-gray-700 hover:text-orange-600 font-medium transition-colors py-2">Admin</Link>
            )}
            <Link to="/about" className="block text-gray-700 hover:text-orange-600 font-medium transition-colors py-2">
              About
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-orange-600 font-medium transition-colors py-2">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

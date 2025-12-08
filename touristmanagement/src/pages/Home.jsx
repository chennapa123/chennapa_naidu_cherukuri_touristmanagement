import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function Home(){
  const [destinations, setDestinations] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, pkgRes] = await Promise.all([
          api.get('/destinations?_limit=3'),
          api.get('/packages?_limit=3')
        ])
        setDestinations(destRes.data || [])
        setPackages(pkgRes.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-300 via-orange-400 to-black text-white py-20 rounded-3xl mb-16 overflow-hidden h-96 bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80")',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold text-white border border-white/30">
              ✨ Discover Your Next Adventure
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Explore the World,<br/>Create Memories
          </h1>
          <p className="text-lg md:text-xl mb-10 text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Embark on unforgettable journeys with our curated travel experiences. From hidden gems to iconic destinations, we make your dreams come true.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/destinations"
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all shadow-2xl hover:shadow-2xl hover:shadow-orange-300/50 transform hover:scale-105 duration-300"
            >
              Explore Destinations
            </Link>
            <Link
              to="/packages"
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white/30 transition-all shadow-xl border-2 border-white/50 transform hover:scale-105 duration-300"
            >
              View Packages
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-full h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-300 opacity-5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-500/50 hover:border-orange-400">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Worldwide Destinations</h3>
          <p className="text-gray-300 leading-relaxed">Explore breathtaking locations around the globe with our curated collection of the world's best destinations.</p>
        </div>

        <div className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-500/50 hover:border-orange-400">
          <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Best Prices</h3>
          <p className="text-gray-300 leading-relaxed">Competitive pricing with transparent costs. No hidden fees, no surprises—just great value.</p>
        </div>

        <div className="group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-500/50 hover:border-orange-400">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-black rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
          <p className="text-gray-300 leading-relaxed">Round-the-clock assistance available whenever you need help during your journey.</p>
        </div>
      </section>

      {/* Popular Destinations */}
      {!loading && destinations.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-2">Explore</p>
              <h2 className="text-4xl font-bold text-white">Popular Destinations</h2>
            </div>
            <Link to="/destinations" className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-2 group">
              View All 
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div key={dest.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={dest.image || 'https://via.placeholder.com/400x200'}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {dest.shortDescription || dest.description}
                  </p>
                  <Link
                    to={`/destination/${dest.id}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-bold group/link"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Packages */}
      {!loading && packages.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-2">Curated</p>
              <h2 className="text-4xl font-bold text-white">Featured Packages</h2>
            </div>
            <Link to="/packages" className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-2 group">
              View All 
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={pkg.image || 'https://via.placeholder.com/400x200'}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  {pkg.price && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-full font-bold shadow-lg">
                      ${pkg.price}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {pkg.shortDescription || pkg.description}
                  </p>
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-bold group/link"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden border-4 border-orange-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Ready to Start Your Journey?</h2>
          <p className="text-xl md:text-2xl mb-10 text-orange-200 max-w-2xl mx-auto leading-relaxed">Join thousands of happy travelers and book your next adventure with us today.</p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-2xl hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 duration-300 text-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

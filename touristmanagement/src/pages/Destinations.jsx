import React, { useEffect, useState } from 'react'
import DestinationCard from '../components/DestinationCard'
import api from '../services/api'

const fallbackDestinations = [
  {
    id: 'fallback-goa',
    name: 'Goa',
    shortDescription: 'Golden beaches, nightlife, and seafood feasts on India’s west coast.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fallback-raj',
    name: 'Rajasthan',
    shortDescription: 'Fortresses, palaces, and desert safaris across the royal state.',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fallback-kerala',
    name: 'Kerala',
    shortDescription: 'Backwater cruises, spice plantations, and misty hill stations.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  }
]

export default function Destinations(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    let isMounted = true
    api.get('/destinations')
      .then(res => {
        if (!isMounted) return
        setItems(res.data)
      })
      .catch(() => {
        if (!isMounted) return
        setItems(fallbackDestinations)
        setError('Showing demo data because the backend is unreachable.')
      })
      .finally(() => isMounted && setLoading(false))
    return () => { isMounted = false }
  },[])

  return (
    <div className="space-y-8">
      <div className="pb-8 border-b-2 border-gray-700">
        <p className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-2">Explore the World</p>
        <h1 className="text-5xl font-bold text-white mb-3">Where will you go next?</h1>
        <p className="text-lg text-gray-300 max-w-2xl">Browse our curated collection of breathtaking destinations with stunning visuals and detailed information to help you plan your perfect getaway.</p>
      </div>

      {error && (
        <div className="bg-amber-50 border-2 border-amber-200 text-amber-900 px-6 py-4 rounded-xl text-sm font-medium shadow-md">
          ℹ️ {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-80 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-200 p-12 text-center shadow-lg">
          <svg className="w-16 h-16 mx-auto mb-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations yet</h3>
          <p className="text-gray-600">Add destinations to <code className="bg-white px-2 py-1 rounded text-orange-600 font-semibold">db.json</code> to populate this page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div key={item.id} className="animate-slide-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <DestinationCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import PackageCard from '../components/PackageCard'
import api from '../services/api'

const fallbackPackages = [
  {
    id: 'fallback-goa-weekend',
    title: 'Goa Weekend Getaway',
    summary: '3 days / 2 nights · curated beach resort, club passes, sunset cruise.',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fallback-rajasthan-heritage',
    title: 'Rajasthan Heritage Trail',
    summary: '5 days / 4 nights · Jaipur, Jodhpur, Jaisalmer with heritage stays.',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fallback-kerala-wellness',
    title: 'Kerala Wellness Escape',
    summary: '6 days / 5 nights · houseboat stay, ayurveda spa, tea garden walk.',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80'
  }
]

export default function Packages(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    let isMounted = true
    api.get('/packages')
      .then(r => {
        if (!isMounted) return
        setItems(r.data)
      })
      .catch(() => {
        if (!isMounted) return
        setItems(fallbackPackages)
        setError('Showing demo packages because the backend is unreachable.')
      })
      .finally(() => isMounted && setLoading(false))
    return () => { isMounted = false }
  },[])

  return (
    <div className="space-y-8">
      <div className="pb-8 border-b-2 border-gray-700">
        <p className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-2">Curated Experiences</p>
        <h1 className="text-5xl font-bold text-white mb-3">Handpicked journeys for every traveller</h1>
        <p className="text-lg text-gray-300 max-w-2xl">Mix and match accommodations, experiences, and transfers in minutes. Choose from our expertly curated packages designed to create unforgettable memories.</p>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No packages to display</h3>
          <p className="text-gray-600">Update <code className="bg-white px-2 py-1 rounded text-orange-600 font-semibold">db.json</code> to see available travel packages.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((pkg, idx) => (
            <div key={pkg.id || pkg.title} className="animate-slide-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

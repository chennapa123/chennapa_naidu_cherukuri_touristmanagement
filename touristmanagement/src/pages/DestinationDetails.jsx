import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

export default function DestinationDetails(){
  const {id} = useParams()
  const [item, setItem] = useState(null)
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    Promise.all([
      api.get(`/destinations/${id}`),
      api.get('/packages')
    ])
    .then(([destRes, pkgRes]) => {
      if(!mounted) return
      setItem(destRes.data)
      // Filter packages for this destination
      const relatedPkgs = (pkgRes.data || []).filter(p => 
        p.destination && p.destination.toLowerCase().includes(destRes.data.name.toLowerCase())
      )
      setPackages(relatedPkgs)
    })
    .catch(err => console.error('Failed to load destination', err))
    .finally(() => { if(mounted) setLoading(false) })
    
    return () => { mounted = false }
  },[id])

  if(loading) return <div className="text-white">Loading...</div>
  if(!item) return <div className="text-white">Destination not found</div>

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <div className="max-w-6xl mx-auto mt-8 text-white">
      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden mb-8 h-96">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">{item.description}</p>

          {/* Short Description */}
          {item.shortDescription && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
              <p className="text-gray-200 italic">{item.shortDescription}</p>
            </div>
          )}

          {/* Attractions */}
          {item.attractions && item.attractions.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-orange-400">Must-See Attractions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.attractions.map((attraction, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-start gap-3">
                    <span className="text-orange-400 font-bold flex-shrink-0">•</span>
                    <span className="text-gray-300">{attraction}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best Time to Visit */}
          {item.bestTime && (
            <div className="mb-6 bg-gradient-to-r from-orange-900/30 to-orange-800/30 border border-orange-700 rounded-xl p-4">
              <h3 className="font-semibold text-orange-400 mb-2">Best Time to Visit</h3>
              <p className="text-gray-200">{item.bestTime}</p>
            </div>
          )}
        </div>

        {/* Sidebar - Related Packages */}
        <div className="md:col-span-1">
          {user ? (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-orange-400">Available Packages</h3>
              {packages.length === 0 ? (
                <p className="text-gray-400 text-sm">No packages available for this destination yet.</p>
              ) : (
                <div className="space-y-3">
                  {packages.map(pkg => (
                    <Link key={pkg.id} to={`/packages/${pkg.id}`} className="block">
                      <div className="bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors">
                        <div className="font-medium text-sm">{pkg.title}</div>
                        <div className="text-orange-400 font-bold mt-2">₹{pkg.price}</div>
                        <div className="text-xs text-gray-400 mt-1">{pkg.summary}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
        <p className="mb-6 text-white/90">Browse our curated packages for {item.name} and book your adventure today.</p>
        <Link to="/packages" className="inline-block px-8 py-3 bg-white text-orange-600 font-bold rounded-lg hover:shadow-lg transition-all">
          View All Packages
        </Link>
      </div>
    </div>
  )
}

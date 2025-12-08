import React from 'react'
import { Link } from 'react-router-dom'

export default function PackageCard({pkg}){
  const title = pkg.title || pkg.name || 'Travel Package'
  const summary = pkg.summary || pkg.shortDescription || pkg.details || ''
  const price = pkg.price ? `₹${pkg.price.toLocaleString()}` : 'Custom quote'

  return (
    <div className="group bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-800">
      {pkg.image && (
        <div className="relative h-56 overflow-hidden bg-gray-800">
          <img
            src={pkg.image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
            {price}
          </div>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-3 leading-relaxed">{summary}</p>
        {!pkg.image && (
          <div className="text-lg font-bold text-orange-400 mb-4">{price}</div>
        )}
        <Link
          to={`/packages/${pkg.id || ''}`}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-bold group/link transition-colors"
        >
          View details
          <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

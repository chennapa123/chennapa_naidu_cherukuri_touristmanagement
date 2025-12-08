import React from 'react'
import { Link } from 'react-router-dom'

export default function DestinationCard({item}){
  return (
    <div className="group bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-800">
      <div className="relative h-56 overflow-hidden bg-gray-800">
        <img 
          src={item.image || 'https://via.placeholder.com/400x200'} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">{item.shortDescription || item.description}</p>
        <Link 
          to={`/destination/${item.id}`} 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-bold group/link transition-colors"
        >
          View Details
          <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

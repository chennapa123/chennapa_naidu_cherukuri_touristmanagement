import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function AdminPackages(){
  const [packages, setPackages] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    summary: '',
    details: '',
    price: '',
    destination: '',
    image: '',
    includes: ''
  })

  useEffect(()=>{
    let mounted = true
    Promise.all([api.get('/packages'), api.get('/bookings')])
      .then(([pkgRes, bkRes]) => {
        if(!mounted) return
        setPackages(pkgRes.data || [])
        setBookings(bkRes.data || [])
      })
      .catch(err => console.error('Failed to fetch packages data', err))
      .finally(()=>{ if(mounted) setLoading(false) })
    return ()=>{ mounted = false }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.price || !formData.destination) {
      alert('Please fill in all required fields')
      return
    }

    const packageData = {
      title: formData.title,
      name: formData.title,
      summary: formData.summary,
      details: formData.details,
      price: parseInt(formData.price),
      destination: formData.destination,
      image: formData.image,
      includes: formData.includes.split(',').map(i => i.trim()).filter(i => i)
    }

    try {
      const destinationName = packageData.destination?.trim()

      if (destinationName) {
        // Ensure destination exists in destinations collection
        try {
          const destRes = await api.get(`/destinations?name=${encodeURIComponent(destinationName)}`)
          const existing = Array.isArray(destRes.data) ? destRes.data[0] : null

          if (!existing) {
            const newDestination = {
              name: destinationName,
              shortDescription: packageData.summary || `Top experiences in ${destinationName}`,
              description: packageData.details || packageData.summary || `Explore the best of ${destinationName} with our curated packages.`,
              image: packageData.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
              attractions: [],
              bestTime: ''
            }

            await api.post('/destinations', newDestination)
          }
        } catch (destErr) {
          console.error('Failed to sync destination for package', destErr)
        }
      }

      if (editingId) {
        // Update existing package
        await api.put(`/packages/${editingId}`, packageData)
        setPackages(prev => prev.map(p => p.id === editingId ? { ...p, ...packageData } : p))
        alert('Package updated successfully!')
      } else {
        // Create new package
        const res = await api.post('/packages', packageData)
        setPackages(prev => [...prev, res.data])
        alert('Package created successfully!')
      }
      resetForm()
    } catch (err) {
      console.error('Failed to save package', err)
      alert('Could not save package. Try again later.')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      name: '',
      summary: '',
      details: '',
      price: '',
      destination: '',
      image: '',
      includes: ''
    })
    setShowForm(false)
    setEditingId(null)
  }

  const handleEditPackage = (pkg) => {
    setFormData({
      title: pkg.title,
      name: pkg.name,
      summary: pkg.summary,
      details: pkg.details,
      price: pkg.price.toString(),
      destination: pkg.destination,
      image: pkg.image,
      includes: pkg.includes ? pkg.includes.join(', ') : ''
    })
    setEditingId(pkg.id)
    setShowForm(true)
  }

  const handleDeletePackage = async (id) => {
    if(!confirm('Are you sure you want to delete this package? This action cannot be undone.')) return
    try {
      await api.delete(`/packages/${id}`)
      setPackages(prev => prev.filter(p => p.id !== id))
      alert('Package deleted successfully!')
    } catch (err) {
      console.error('Failed to delete package', err)
      alert('Could not delete package. Try again later.')
    }
  }

  const bookingCountByPackage = bookings.reduce((acc, booking) => {
    acc[booking.packageId] = (acc[booking.packageId] || 0) + 1
    return acc
  }, {})

  const totalRevenue = bookings.reduce((sum, booking) => {
    const pkg = packages.find(p => p.id === booking.packageId)
    return sum + (pkg ? pkg.price : 0)
  }, 0)

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-900 rounded-2xl text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="flex gap-3 flex-wrap">
          <Link to="/admin/users" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
            Users
          </Link>
          <Link to="/admin/bookings" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
            Bookings by User
          </Link>
          <Link to="/admin/packages" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-medium transition-colors">
            Package Analytics
          </Link>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Packages & Booking Analytics</h2>
      
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
      >
        {showForm ? 'Cancel' : '+ Create New Package'}
      </button>

      {showForm && (
        <div className="mb-8 bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">{editingId ? 'Update Package' : 'Create New Package'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Package Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Goa Weekend Getaway"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="7999"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Destination *</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Goa"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Summary</label>
              <input
                type="text"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Brief summary of the package"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="3"
                placeholder="Detailed package description"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Includes (comma-separated)</label>
              <input
                type="text"
                name="includes"
                value={formData.includes}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Accommodation, Breakfast, Sightseeing, ..."
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                {editingId ? 'Update Package' : 'Create Package'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-8 bg-gray-800 border border-gray-700 rounded-xl p-6">
        <div className="text-sm text-gray-300">Total Revenue from All Bookings</div>
        <div className="text-3xl font-bold text-orange-400">₹{totalRevenue.toLocaleString('en-IN')}</div>
      </div>

      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : (
        <div className="space-y-4">
          {packages.length === 0 && (
            <div className="text-gray-300">No packages found.</div>
          )}

          {packages.map(pkg => {
            const count = bookingCountByPackage[pkg.id] || 0
            const revenue = pkg.price * count
            return (
              <div key={pkg.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{pkg.title}</div>
                    <div className="text-sm text-gray-400 mt-1">{pkg.destination}</div>
                    <div className="text-sm text-gray-300 mt-2">
                      Base Price: <span className="text-orange-400 font-bold">₹{pkg.price}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-400">{count}</div>
                    <div className="text-xs text-gray-400">Total Bookings</div>
                    <div className="mt-2 text-lg font-semibold text-green-400">₹{revenue.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-gray-400">Revenue</div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

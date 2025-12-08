import React, {useEffect, useState, useMemo} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function PackageDetails(){
  const {id} = useParams()
  const navigate = useNavigate()
  const [pkg,setPkg] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [loadingBooking, setLoadingBooking] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{
    api.get(`/packages/${id}`).then(r=>setPkg(r.data)).catch(()=>{})
  },[id])

  const user = useMemo(() => {
    try {
      const u = localStorage.getItem('user')
      return u ? JSON.parse(u) : null
    } catch (e) {
      return null
    }
  }, [])

  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  if(!pkg) return <div className="text-white">Loading...</div>

  const handleBook = async () => {
    setError('')
    if(!user){
      navigate('/login')
      return
    }
    if(!bookingDate){
      setError('Please choose a booking date')
      return
    }
    const today = getTodayDate()
    if(bookingDate < today){
      setError('Booking date must be in the future')
      return
    }
    setLoadingBooking(true)
    try{
      await api.post('/bookings', {
        title: pkg.title,
        date: bookingDate,
        packageId: pkg.id,
        userId: user.id
      })
      navigate('/bookings')
      window.location.reload()
    }catch(err){
      console.error('Booking failed', err)
      setError('Booking failed. Please try again.')
    }finally{
      setLoadingBooking(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-lg p-6 mt-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={pkg.image} alt={pkg.title} className="w-full h-64 md:h-80 object-cover rounded-xl" />
          <div className="mt-4 text-gray-300">
            <p className="text-xl font-semibold text-white">{pkg.title}</p>
            <p className="mt-2 text-sm">{pkg.summary}</p>
            <p className="mt-3 font-bold text-orange-400 text-lg">₹{pkg.price}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-3">Package Details</h2>
          <p className="text-gray-300 leading-relaxed">{pkg.details}</p>

          <div className="mt-6">
            <h3 className="font-semibold text-white">What's included</h3>
            <ul className="mt-2 text-gray-300 list-disc list-inside">
              {pkg.includes && pkg.includes.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            {user ? (
              <div className="space-y-3">
                <label className="block text-sm text-gray-300">Select booking date</label>
                <input
                  type="date"
                  min={getTodayDate()}
                  value={bookingDate}
                  onChange={(e)=>setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {error && <div className="text-sm text-red-400">{error}</div>}
                <button
                  onClick={handleBook}
                  disabled={loadingBooking}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  {loadingBooking ? 'Booking...' : 'Book Now'}
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <p className="text-gray-300 font-semibold">You need to be logged in to book this package.</p>
                <div className="flex gap-3 pt-2">
                  <Link to="/login" className="flex-1 px-4 py-2 text-center text-sm font-semibold text-gray-800 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="flex-1 px-4 py-2 text-center text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:shadow-lg transition-all">
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

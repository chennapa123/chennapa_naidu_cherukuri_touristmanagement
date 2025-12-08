import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function AdminBookings(){
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    Promise.all([api.get('/bookings'), api.get('/users')])
      .then(([bkRes, usersRes]) => {
        if(!mounted) return
        setBookings(bkRes.data || [])
        setUsers(usersRes.data || [])
      })
      .catch(err => console.error('Failed to fetch bookings data', err))
      .finally(()=>{ if(mounted) setLoading(false) })
    return ()=>{ mounted = false }
  },[])

  // Group bookings by user
  const bookingsByUser = {}
  bookings.forEach(b => {
    if(!bookingsByUser[b.userId]) {
      bookingsByUser[b.userId] = []
    }
    bookingsByUser[b.userId].push(b)
  })

  const userMap = new Map(users.map(u => [u.id, u]))

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-900 rounded-2xl text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="flex gap-3 flex-wrap">
          <Link to="/admin/users" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
            Users
          </Link>
          <Link to="/admin/bookings" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-medium transition-colors">
            Bookings by User
          </Link>
          <Link to="/admin/packages" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
            Package Analytics
          </Link>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Bookings by User</h2>
      
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : (
        <div className="space-y-6">
          {Object.keys(bookingsByUser).length === 0 && (
            <div className="text-gray-300">No bookings found.</div>
          )}

          {Object.keys(bookingsByUser).map(userId => {
            const userBks = bookingsByUser[userId]
            const user = userMap.get(parseInt(userId))
            return (
              <div key={userId} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="font-semibold text-lg">{user?.name || 'Unknown User'}</div>
                  <div className="text-sm text-gray-400">{user?.email} • Total Bookings: <span className="text-orange-400 font-bold">{userBks.length}</span></div>
                </div>

                <div className="space-y-3">
                  {userBks.map((bk, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                      <div>
                        <div className="font-medium">{bk.title}</div>
                        <div className="text-xs text-gray-400">Booking Date: {bk.date}</div>
                      </div>
                      <div className="text-sm text-gray-300">
                        Package ID: <span className="text-orange-400">{bk.packageId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

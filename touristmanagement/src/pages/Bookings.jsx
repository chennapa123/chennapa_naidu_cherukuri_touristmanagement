import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function Bookings(){
  const [items,setItems] = useState([])
  const [loading,setLoading] = useState(true)
  const currentUser = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(()=>{
    let mounted = true
    // fetch bookings, packages and users to enrich display
    Promise.all([api.get('/bookings'), api.get('/packages'), api.get('/users')])
      .then(([bkRes, pkgRes, usersRes]) => {
        if(!mounted) return
        const bookings = bkRes.data || []
        const packages = pkgRes.data || []
        const users = usersRes.data || []

        const pkgMap = new Map(packages.map(p=>[p.id, p]))
        const userMap = new Map(users.map(u=>[u.id, u]))

        let enriched = bookings.map(b => ({
          ...b,
          package: pkgMap.get(b.packageId) || null,
          user: userMap.get(b.userId) || null
        }))

        // If a user is logged in and not an admin, show only their bookings
        if (currentUser && currentUser.role !== 'admin') {
          enriched = enriched.filter(e => e.user && e.user.id === currentUser.id)
        }

        // If no user is logged in, show empty list (prompt to login will appear)
        if (!currentUser) {
          enriched = []
        }

        setItems(enriched)
      })
      .catch(err=>{
        console.error('Failed to load bookings data', err)
      })
      .finally(()=>{ if(mounted) setLoading(false) })

    return ()=>{ mounted = false }
  },[])

  const handleDelete = async (id) => {
    if(!confirm('Cancel this booking?')) return
    // only allow cancelling if logged in — admins can cancel any booking
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if(!user){ alert('Please login to cancel bookings'); return }
    const booking = items.find(i => i.id === id)
    if(!booking){ alert('Booking not found'); return }
    if(user.role !== 'admin' && booking.user && booking.user.id !== user.id){
      alert('You can only cancel your own bookings.')
      return
    }
    try{
      await api.delete(`/bookings/${id}`)
      setItems(prev => prev.filter(i=>i.id!==id))
    }catch(err){
      console.error('Failed to delete booking', err)
      alert('Could not cancel booking. Try again later.')
    }
  }

  if(loading) return <div className="text-white">Loading bookings...</div>

  // If no user logged in, prompt to sign in
  if(!currentUser) return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">Your Bookings</h1>
      <div className="text-gray-300">Please <Link to="/login" className="text-orange-400 underline">sign in</Link> to view your bookings.</div>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">Your Bookings</h1>
      <div className="space-y-4">
        {items.length === 0 && (
          <div className="text-gray-300">No bookings yet. Browse <Link to="/packages" className="text-orange-400 underline">packages</Link> to book.</div>
        )}

        {items.map(b=> (
          <div key={b.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg text-white">
            <div className="flex gap-4 p-4 items-center">
              <div className="w-28 h-20 flex-shrink-0">
                {b.package?.image ? (
                  <img src={b.package.image} alt={b.title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center text-sm text-gray-400">No image</div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-lg">{b.title}</div>
                    <div className="text-sm text-gray-300">{b.package?.destination || ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-400 font-bold">{b.package ? `₹${b.package.price}` : ''}</div>
                    <div className="text-sm text-gray-400">{b.date}</div>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-300 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Booked by</div>
                    <div className="text-sm">{b.user?.name || b.user?.email || 'Guest'}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to={`/bookings/edit/${b.id}`} className="text-orange-400 hover:underline">Edit</Link>
                    <button onClick={()=>handleDelete(b.id)} className="text-sm text-red-400 hover:underline">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

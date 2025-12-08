import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function EditBooking(){
  const {id} = useParams()
  const nav = useNavigate()
  const [item,setItem] = useState(null)
  const [error, setError] = useState('')
  
  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  useEffect(()=>{ api.get(`/bookings/${id}`).then(r=>setItem(r.data)).catch(()=>{}) },[id])
  function save(e){
    e.preventDefault()
    setError('')
    if(!item.date){
      setError('Please select a booking date')
      return
    }
    const today = getTodayDate()
    if(item.date < today){
      setError('Booking date must be in the future')
      return
    }
    api.put(`/bookings/${id}`, item).then(()=>nav('/bookings')).catch(()=>{ setError('Failed to update booking') })
  }
  if(!item) return <div className="text-white">Loading...</div>
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-900 rounded-2xl text-white">
      <h1 className="text-2xl font-bold mb-6">Edit Booking</h1>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Title</label>
          <input value={item.title} onChange={e=>setItem({...item,title:e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"/>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Booking Date</label>
          <input type="date" min={getTodayDate()} value={item.date} onChange={e=>setItem({...item,date:e.target.value})} className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"/>
        </div>
        {error && <div className="text-sm text-red-400">{error}</div>}
        <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">Save Changes</button>
      </form>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function AdminUsers(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.get('/users').then(r=>{ if(mounted) setUsers(r.data) }).catch(()=>{}).finally(()=>{ if(mounted) setLoading(false) })
    return ()=>{ mounted = false }
  },[])

  const handleDelete = async (id)=>{
    if(!confirm('Delete user?')) return
    try{
      await api.delete(`/users/${id}`)
      setUsers(prev => prev.filter(u=>u.id !== id))
    }catch(e){
      console.error('delete user failed', e)
      alert('Could not delete user')
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-gray-900 rounded-2xl text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="flex gap-3 flex-wrap">
          <Link to="/admin/users" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-medium transition-colors">
            Users
          </Link>
          <Link to="/admin/bookings" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
            Bookings by User
          </Link>
          <Link to="/admin/packages" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
            Package Analytics
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {users.length === 0 && <div className="text-gray-300">No users found.</div>}
          {users.map(u => (
            <div key={u.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
              <div>
                <div className="font-semibold">{u.name || u.email}</div>
                <div className="text-sm text-gray-400">{u.email} {u.role && <>• <span className="text-orange-400">{u.role}</span></>}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={()=>navigator.clipboard?.writeText(u.email)} className="text-sm text-gray-300 hover:text-white">Copy Email</button>
                <button onClick={()=>handleDelete(u.id)} className="text-sm text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

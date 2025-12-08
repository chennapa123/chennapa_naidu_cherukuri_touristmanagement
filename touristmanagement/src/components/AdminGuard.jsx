import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AdminGuard({ children }){
  try{
    const raw = localStorage.getItem('user')
    const user = raw ? JSON.parse(raw) : null
    if (!user || user.role !== 'admin') {
      return <Navigate to="/login" replace />
    }
    return children
  }catch(e){
    return <Navigate to="/login" replace />
  }
}

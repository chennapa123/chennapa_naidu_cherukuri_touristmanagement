import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetails from './pages/DestinationDetails'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import Bookings from './pages/Bookings'
import EditBooking from './pages/EditBooking'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/Layout'
import AdminUsers from './pages/admin/AdminUsers'
import AdminBookings from './pages/admin/AdminBookings'
import AdminPackages from './pages/admin/AdminPackages'
import AdminGuard from './components/AdminGuard'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/destinations" element={<Layout><Destinations/></Layout>} />
        <Route path="/destination/:id" element={<Layout><DestinationDetails/></Layout>} />
        <Route path="/packages" element={<Layout><Packages/></Layout>} />
        <Route path="/packages/:id" element={<Layout><PackageDetails/></Layout>} />
        <Route path="/bookings" element={<Layout><Bookings/></Layout>} />
        <Route path="/bookings/edit/:id" element={<Layout><EditBooking/></Layout>} />
        <Route path="/about" element={<Layout><About/></Layout>} />
        <Route path="/admin/users" element={<Layout><AdminGuard><AdminUsers/></AdminGuard></Layout>} />
        <Route path="/admin/bookings" element={<Layout><AdminGuard><AdminBookings/></AdminGuard></Layout>} />
        <Route path="/admin/packages" element={<Layout><AdminGuard><AdminPackages/></AdminGuard></Layout>} />
        {/* How-it-works merged into About - route removed */}
        <Route path="/contact" element={<Layout><Contact/></Layout>} />
      </Routes>
    </div>
  )
}

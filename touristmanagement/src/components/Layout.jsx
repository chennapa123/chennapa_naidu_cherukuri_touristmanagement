import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 bg-black">
        {children}
      </main>
      <Footer />
    </>
  )
}


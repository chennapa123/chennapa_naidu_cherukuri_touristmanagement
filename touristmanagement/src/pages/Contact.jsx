import React from 'react'

export default function Contact() {
  return (
    <div className="bg-black text-white min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Section */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Email</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">General Inquiries</p>
                <p className="text-orange-400 font-semibold">info@touristmanagement.com</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Booking Support</p>
                <p className="text-orange-400 font-semibold">bookings@touristmanagement.com</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Customer Service</p>
                <p className="text-orange-400 font-semibold">support@touristmanagement.com</p>
              </div>
            </div>
          </div>

          {/* Phone Section */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-4">Phone</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Main Office</p>
                <p className="text-orange-400 font-semibold">+91-8765-432-109</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Toll Free</p>
                <p className="text-orange-400 font-semibold">1800-123-4567</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Emergency Support</p>
                <p className="text-orange-400 font-semibold">+91-9876-543-210</p>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Office Address</h2>
            <div className="space-y-2 text-gray-300">
              <p className="font-semibold">Tourist Management Headquarters</p>
              <p>123 Travel Street, Tourism Tower</p>
              <p>New Delhi, Delhi 110001, India</p>
              <p className="mt-4 text-gray-400 text-sm">Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
              <p className="text-gray-400 text-sm">Sunday: Closed</p>
            </div>
          </div>

          {/* Social Section */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Follow Us</h2>
            <div className="flex gap-4 flex-wrap">
              <a href="#" className="text-orange-400 hover:text-orange-500 font-semibold">Facebook</a>
              <a href="#" className="text-orange-400 hover:text-orange-500 font-semibold">Instagram</a>
              <a href="#" className="text-orange-400 hover:text-orange-500 font-semibold">Twitter</a>
              <a href="#" className="text-orange-400 hover:text-orange-500 font-semibold">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

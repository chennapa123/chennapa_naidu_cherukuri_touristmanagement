import React from 'react'

const steps = [
  {
    label: '1. Inspire & educate',
    description: 'Travellers browse destinations, media galleries, FAQs, and curated packages to shape their wish list.',
    action: { label: 'Browse destinations', to: '/destinations' }
  },
  {
    label: '2. Build & confirm',
    description: 'They assemble itineraries, request tweaks from agencies, and complete secure bookings in one flow.',
    action: { label: 'See packages', to: '/packages' }
  },
  {
    label: '3. Operate & support',
    description: 'Agencies coordinate suppliers, issue vouchers, track departures, and resolve requests with live updates.',
    action: { label: 'Manage bookings', to: '/bookings' }
  }
]

const stats = [
  { label: 'Destinations curated', value: '120+' },
  { label: 'Partner agencies', value: '65' },
  { label: 'Trips managed', value: '18k+' },
  { label: 'Customer rating', value: '4.8/5' }
]

const pillars = [
  {
    title: 'Unified Planning Hub',
    description: 'Travellers browse destinations, compare rich media galleries, and build itineraries while agencies update content in real time.'
  },
  {
    title: 'Smart Operations',
    description: 'Booking automation, availability tracking, and notification workflows remove repetitive tasks for agency back offices.'
  },
  {
    title: 'Insightful Decisions',
    description: 'Dashboards highlight demand trends, booking health, and revenue pipelines so teams can act with confidence.'
  }
]

export default function About(){
  return (
    <div className="space-y-12">
      <section className="bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-800">
        <p className="text-sm uppercase tracking-widest text-orange-400 font-semibold mb-2">About the platform</p>
        <h1 className="text-4xl font-extrabold text-white mb-4">Tourist Management System</h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
          The Tourist Management System centralises every step of planning, booking, and monitoring travel programs.
          Travellers explore immersive destination content, compare curated packages, and confirm itineraries in a
          couple of clicks. Tour agencies respond from the same workspace—assigning guides, coordinating vendors,
          and keeping every stakeholder informed.
        </p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(item => (
          <div key={item.label} className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-3xl font-extrabold">{item.value}</div>
            <div className="text-sm uppercase tracking-wide mt-2 text-orange-100">{item.label}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map(item => (
          <div key={item.title} className="bg-gray-900 rounded-2xl border border-gray-800 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
            <p className="text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      {/* How it works merged section */}
      <section className="space-y-8">
        <header className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-orange-400 font-semibold mb-2">Workflow</p>
          <h2 className="text-3xl font-extrabold text-white mb-3">How the Tourist Management System works</h2>
          <p className="text-lg text-gray-300">A consistent journey from the first spark of inspiration to the final day of travel. Every participant works from the same source of truth.</p>
        </header>

        <div className="space-y-6">
          {steps.map(step => (
            <div key={step.label} className="bg-gray-900 rounded-3xl border border-gray-800 shadow-md p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold">{step.label}</p>
                <p className="text-xl font-bold text-white mt-2">{step.description}</p>
              </div>
              <a
                href={step.action.to}
                className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all hover:shadow-lg"
              >
                {step.action.label}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-black rounded-3xl p-10 text-white text-center">
          <h3 className="text-3xl font-bold mb-3">Ready to digitise your travel operations?</h3>
          <p className="text-lg text-orange-100 mb-6">Invite your team, onboard suppliers, and start delivering delightful journeys.</p>
          <a href="/register" className="inline-block px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-colors">Create an account</a>
        </div>
      </section>
    </div>
  )
}

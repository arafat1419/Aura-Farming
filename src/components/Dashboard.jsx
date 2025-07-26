import React, { useState } from 'react'
import StatsCard from './StatsCard'
import ChartCard from './ChartCard'
import NotificationPanel from './common/NotificationPanel'
import RegistrationModule from './modules/RegistrationModule'
import ApplicationsModule from './modules/ApplicationsModule'
import ClaimsModule from './modules/ClaimsModule'
import DiaryModule from './modules/DiaryModule'
import SatelliteModule from './modules/SatelliteModule'
import './Dashboard.css'

const Dashboard = ({ activeSection }) => {
  // Render specialized modules for each section
  if (activeSection === 'registration') {
    return <RegistrationModule />
  }

  if (activeSection === 'applications') {
    return <ApplicationsModule />
  }

  if (activeSection === 'claims') {
    return <ClaimsModule />
  }

  if (activeSection === 'diary') {
    return <DiaryModule />
  }

  if (activeSection === 'satellite') {
    return <SatelliteModule />
  }

  // Default dashboard overview
  const executiveStats = [
    { title: 'Total Petani Terdaftar', value: '127,480', icon: '👥', trend: '+18%' },
    { title: 'Lahan Terpantau Satelit', value: '89,245 Ha', icon: '🛰️', trend: '+15%' },
    { title: 'Premi Parametrik', value: 'Rp 47.8M', icon: '💳', trend: '+25%' },
    { title: 'AI Prediksi Akurat', value: '94.2%', icon: '🤖', trend: '+3%' }
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🛰️ Dashboard Utama</h1>
        <p>Inovasi Asuransi Parametrik Pertanian Berbasis Satelit dan Artificial Intelligence</p>
      </div>

      <div className="stats-grid">
        {executiveStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-content">
        <div className="charts-notifications-grid">
          <div className="charts-section">
            <div className="charts-grid">
              <ChartCard
                title="Tren Pendaftaran Bulanan"
                type="line"
                section={activeSection}
              />
              <ChartCard
                title="Distribusi Regional"
                type="pie"
                section={activeSection}
              />
              <ChartCard
                title="Perbandingan Tahun"
                type="bar"
                section={activeSection}
              />
            </div>
          </div>
          <div className="notifications-section">
            <NotificationPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
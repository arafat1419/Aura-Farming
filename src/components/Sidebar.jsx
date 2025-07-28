import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Sidebar.css'

const Sidebar = ({ activeSection, setActiveSection, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user, signOut } = useAuth()
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: '📊' },
    { id: 'registration', label: 'Pendaftaran', icon: '📝' },
    { id: 'applications', label: 'Aplikasi Asuransi', icon: '📋' },
    { id: 'claims', label: 'Klaim & Investigasi', icon: '💰' },
    { id: 'diary', label: 'Catatan Harian Petani', icon: '📖' },
    { id: 'satellite', label: 'Monitoring Satelit', icon: '🛰️' }
  ]

  return (
    <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img src="/LOGO.png" alt="Parametric Insurance Logo" className="logo" />
          <div className="logo-text">
            <h2>INOVASI</h2>
            <p>Asuransi Parametrik Pertanian<br />Satelit & AI</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(item.id)
              setIsMobileMenuOpen(false)
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <p className="user-name">{user?.name || 'Admin Pemerintah'}</p>
            <p className="user-role">{user?.department || 'Kementerian Pertanian'}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={signOut} title="Keluar">
          <span className="logout-icon">🚪</span>
          <span className="logout-text">Keluar</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
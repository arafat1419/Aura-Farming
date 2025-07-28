import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import ProtectedRoute from './components/auth/ProtectedRoute'
import './App.css'

function DashboardApp() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="app">
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="main-content">
        <Dashboard activeSection={activeSection} />
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardApp />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
import React, { useState } from 'react'
import { farmers } from '../../data/mockData'
import './RegistrationModule.css'

const RegistrationModule = () => {
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [activeTab, setActiveTab] = useState('pipeline')

  const registrationSteps = [
    { id: 1, name: 'Pendaftaran Awal', count: 45, color: '#3b82f6' },
    { id: 2, name: 'Verifikasi Dokumen', count: 23, color: '#f59e0b' },
    { id: 3, name: 'Survey Lapangan', count: 18, color: '#8b5cf6' },
    { id: 4, name: 'Persetujuan PPL', count: 12, color: '#06b6d4' },
    { id: 5, name: 'Selesai', count: 147, color: '#10b981' }
  ]

  const pendingVerifications = farmers.filter(f => f.status === 'Pending').slice(0, 5)
  const recentRegistrations = farmers.filter(f => f.status === 'Aktif').slice(0, 8)

  return (
    <div className="registration-module">
      <div className="module-header">
        <h1>🌾 Sistem Pendaftaran Petani</h1>
        <p>Kelola proses pendaftaran dan verifikasi petani</p>
        <div className="header-actions">
          <button className="btn-primary">➕ Daftar Petani Baru</button>
          <button className="btn-secondary">📋 Import Excel</button>
        </div>
      </div>

      <div className="registration-tabs">
        <button
          className={`tab ${activeTab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('pipeline')}
        >
          🔄 Pipeline Pendaftaran
        </button>
        <button
          className={`tab ${activeTab === 'verification' ? 'active' : ''}`}
          onClick={() => setActiveTab('verification')}
        >
          ✅ Antrian Verifikasi
        </button>
        <button
          className={`tab ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          🗺️ Peta Sebaran
        </button>
      </div>

      {activeTab === 'pipeline' && (
        <div className="pipeline-view">
          <div className="pipeline-header">
            <h3>Pipeline Registrasi</h3>
            <p>Total: {registrationSteps.reduce((sum, step) => sum + step.count, 0)} petani dalam proses</p>
          </div>

          <div className="pipeline-stages">
            {registrationSteps.map((step, index) => (
              <div key={step.id} className="pipeline-stage">
                <div className="stage-header" style={{ borderTop: `4px solid ${step.color}` }}>
                  <h4>{step.name}</h4>
                  <span className="stage-count">{step.count}</span>
                </div>
                <div className="stage-content">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(step.count / 50) * 100}%`,
                        background: step.color
                      }}
                    ></div>
                  </div>
                  <div className="stage-actions">
                    <button className="action-link">Lihat Detail</button>
                    <button className="action-link">Proses Batch</button>
                  </div>
                </div>
                {index < registrationSteps.length - 1 && (
                  <div className="pipeline-arrow">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="recent-activity">
            <h4>Aktivitas Terbaru</h4>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <div className="activity-content">
                  <p><strong>Budi Santoso</strong> telah diverifikasi</p>
                  <span className="activity-time">2 jam yang lalu</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">📋</span>
                <div className="activity-content">
                  <p><strong>5 petani baru</strong> mendaftar dari Bandung</p>
                  <span className="activity-time">4 jam yang lalu</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🔍</span>
                <div className="activity-content">
                  <p><strong>Survey lapangan</strong> dijadwalkan untuk 12 petani</p>
                  <span className="activity-time">6 jam yang lalu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'verification' && (
        <div className="verification-view">
          <div className="verification-header">
            <h3>Antrian Verifikasi</h3>
            <div className="verification-filters">
              <select>
                <option>Semua Provinsi</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>Jawa Timur</option>
              </select>
              <select>
                <option>Semua PPL</option>
                <option>PPL Aktif</option>
                <option>Perlu Assignment</option>
              </select>
            </div>
          </div>

          <div className="verification-queue">
            {pendingVerifications.map(farmer => (
              <div key={farmer.id} className="verification-card">
                <div className="farmer-info">
                  <div className="farmer-avatar">👨‍🌾</div>
                  <div className="farmer-details">
                    <h4>{farmer.nama}</h4>
                    <p>NIK: {farmer.nik}</p>
                    <p>📍 {farmer.kabupaten}, {farmer.provinsi}</p>
                    <p>🌾 {farmer.luas} Ha - {farmer.kelompokTani}</p>
                  </div>
                </div>
                <div className="verification-status">
                  <span className="status-badge warning">Pending Verifikasi</span>
                  <p className="registration-date">Daftar: {farmer.tanggalDaftar}</p>
                </div>
                <div className="verification-actions">
                  <button className="btn-approve">✅ Verifikasi</button>
                  <button className="btn-detail">👁️ Detail</button>
                  <button className="btn-reject">❌ Tolak</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bulk-actions">
            <button className="btn-bulk">✅ Verifikasi Terpilih</button>
            <button className="btn-bulk">📧 Kirim Notifikasi</button>
            <button className="btn-bulk">📄 Cetak Laporan</button>
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="map-view">
          <div className="map-header">
            <h3>Sebaran Geografis Petani</h3>
            <div className="map-stats">
              <div className="stat-item">
                <span className="stat-number">127,480</span>
                <span className="stat-label">Total Petani</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">34</span>
                <span className="stat-label">Provinsi</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2,156</span>
                <span className="stat-label">Kelompok Tani</span>
              </div>
            </div>
          </div>

          <div className="map-container">
            <div className="map-placeholder">
              <h3>🗺️ Peta Indonesia</h3>
              <p>Integrasi dengan peta interaktif akan menampilkan:</p>
              <ul>
                <li>• Sebaran petani per kabupaten</li>
                <li>• Densitas pendaftaran</li>
                <li>• Status verifikasi regional</li>
                <li>• Coverage area PPL</li>
              </ul>
            </div>
          </div>

          <div className="regional-breakdown">
            <h4>Top 5 Kabupaten</h4>
            <div className="region-list">
              {[
                { name: 'Bandung, Jawa Barat', count: 8945, percentage: 7.2 },
                { name: 'Solo, Jawa Tengah', count: 6781, percentage: 5.5 },
                { name: 'Malang, Jawa Timur', count: 5632, percentage: 4.8 },
                { name: 'Bogor, Jawa Barat', count: 4891, percentage: 4.1 },
                { name: 'Semarang, Jawa Tengah', count: 4234, percentage: 3.6 }
              ].map((region, index) => (
                <div key={index} className="region-item">
                  <div className="region-info">
                    <span className="region-name">{region.name}</span>
                    <span className="region-count">{region.count.toLocaleString()} petani</span>
                  </div>
                  <div className="region-bar">
                    <div
                      className="region-fill"
                      style={{ width: `${region.percentage * 10}%` }}
                    ></div>
                  </div>
                  <span className="region-percentage">{region.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegistrationModule
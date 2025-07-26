import React, { useState } from 'react'
import { claims } from '../../data/mockData'
import './ClaimsModule.css'

const ClaimsModule = () => {
  const [activeView, setActiveView] = useState('investigation')
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [draggedClaim, setDraggedClaim] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)

  const investigationBoard = [
    { 
      status: 'Laporan Masuk', 
      claims: claims.filter(c => c.status === 'Dalam Proses').slice(0, 2),
      color: '#3b82f6',
      icon: '📋'
    },
    { 
      status: 'Survey Dijadwalkan', 
      claims: claims.filter(c => c.status === 'Dalam Proses').slice(2, 4),
      color: '#f59e0b',
      icon: '📅'
    },
    { 
      status: 'Survey Lapangan', 
      claims: claims.filter(c => c.status === 'Disetujui').slice(0, 1),
      color: '#8b5cf6',
      icon: '🔍'
    },
    { 
      status: 'Verifikasi Damage', 
      claims: claims.filter(c => c.status === 'Disetujui').slice(1, 2),
      color: '#06b6d4',
      icon: '✅'
    },
    { 
      status: 'Pembayaran', 
      claims: claims.filter(c => c.status === 'Disetujui').slice(2, 3),
      color: '#10b981',
      icon: '💰'
    }
  ]

  const damageTypes = [
    { type: 'Banjir', count: 45, severity: 'high', icon: '🌊' },
    { type: 'Kekeringan', count: 32, severity: 'medium', icon: '☀️' },
    { type: 'Hama Tikus', count: 28, severity: 'medium', icon: '🐀' },
    { type: 'Angin Kencang', count: 15, severity: 'low', icon: '🌪️' },
    { type: 'Penyakit Tanaman', count: 12, severity: 'low', icon: '🦠' }
  ]

  const fieldOfficers = [
    { name: 'Ahmad Surya', area: 'Jawa Barat', activeClaims: 8, rating: 4.8 },
    { name: 'Siti Handayani', area: 'Jawa Tengah', activeClaims: 6, rating: 4.9 },
    { name: 'Budi Prasetyo', area: 'Jawa Timur', activeClaims: 5, rating: 4.7 },
    { name: 'Dewi Lestari', area: 'Sumatra Utara', activeClaims: 4, rating: 4.6 }
  ]

  const handleDragStart = (e, claim) => {
    setDraggedClaim(claim)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, columnStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumn(columnStatus)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e, columnStatus) => {
    e.preventDefault()
    if (draggedClaim) {
      console.log(`Moving claim ${draggedClaim.id} to ${columnStatus}`)
      // Here you would update the claim status in your state management
    }
    setDraggedClaim(null)
    setDragOverColumn(null)
  }

  const getColumnDragClass = (columnStatus) => {
    if (dragOverColumn === columnStatus) {
      return 'drag-over'
    }
    return ''
  }

  return (
    <div className="claims-module">
      <div className="module-header">
        <h1>💰 Sistem Manajemen Klaim</h1>
        <p>Kelola proses investigasi, verifikasi, dan pembayaran klaim asuransi</p>
        <div className="header-metrics">
          <div className="metric-item urgent">
            <span className="metric-number">23</span>
            <span className="metric-label">Klaim Mendesak</span>
          </div>
          <div className="metric-item">
            <span className="metric-number">4,892</span>
            <span className="metric-label">Total Klaim</span>
          </div>
          <div className="metric-item">
            <span className="metric-number">Rp 21.4M</span>
            <span className="metric-label">Kompensasi Dibayar</span>
          </div>
          <div className="metric-item">
            <span className="metric-number">89.3%</span>
            <span className="metric-label">Tingkat Verifikasi</span>
          </div>
        </div>
      </div>

      <div className="claims-tabs">
        <button 
          className={`tab ${activeView === 'investigation' ? 'active' : ''}`}
          onClick={() => setActiveView('investigation')}
        >
          🔍 Board Investigasi
        </button>
        <button 
          className={`tab ${activeView === 'assessment' ? 'active' : ''}`}
          onClick={() => setActiveView('assessment')}
        >
          📊 Penilaian Kerusakan
        </button>
        <button 
          className={`tab ${activeView === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveView('payment')}
        >
          💸 Pembayaran
        </button>
        <button 
          className={`tab ${activeView === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveView('analytics')}
        >
          📈 Analisis Pola
        </button>
      </div>

      {activeView === 'investigation' && (
        <div className="investigation-view">
          <div className="investigation-board">
            <div className="board-header">
              <h3>🔍 Kanban Board Investigasi</h3>
              <div className="board-controls">
                <button className="btn-add-claim">➕ Klaim Baru</button>
                <button className="btn-auto-assign">🎯 Auto Assign</button>
                <select>
                  <option>Semua Regional</option>
                  <option>Jawa Barat</option>
                  <option>Jawa Tengah</option>
                </select>
              </div>
            </div>
            
            <div className="kanban-board">
              {investigationBoard.map((column, columnIndex) => (
                <div 
                  key={columnIndex} 
                  className={`kanban-column ${getColumnDragClass(column.status)}`}
                  onDragOver={(e) => handleDragOver(e, column.status)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, column.status)}
                >
                  <div className="column-header" style={{ borderTop: `4px solid ${column.color}` }}>
                    <div className="column-title">
                      <span className="column-icon">{column.icon}</span>
                      <span>{column.status}</span>
                    </div>
                    <span className="column-count">{column.claims.length}</span>
                  </div>
                  
                  <div className="column-content">
                    {column.claims.map((claim, index) => (
                      <div 
                        key={claim.id} 
                        className={`claim-card ${draggedClaim?.id === claim.id ? 'dragging' : ''}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, claim)}
                        onClick={() => setSelectedClaim(claim)}
                      >
                        <div className="claim-header">
                          <span className="claim-id">{claim.id}</span>
                          <span className={`priority ${claim.persentaseRusak > 85 ? 'high' : 'medium'}`}>
                            {claim.persentaseRusak > 85 ? '🔴' : '🟡'}
                          </span>
                        </div>
                        <h4>{claim.petani}</h4>
                        <div className="claim-details">
                          <div className="detail-item">
                            <span>📍 Penyebab:</span>
                            <span>{claim.penyebab}</span>
                          </div>
                          <div className="detail-item">
                            <span>🌾 Luas Rusak:</span>
                            <span>{claim.luasRusak} Ha</span>
                          </div>
                          <div className="detail-item">
                            <span>📊 Kerusakan:</span>
                            <span>{claim.persentaseRusak}%</span>
                          </div>
                          <div className="detail-item">
                            <span>💰 Kompensasi:</span>
                            <span>Rp {(claim.kompensasi / 1000000).toFixed(1)}M</span>
                          </div>
                        </div>
                        <div className="claim-footer">
                          <span className="claim-date">{claim.tanggalKlaim}</span>
                          <div className="claim-actions">
                            <button className="action-btn">👁️</button>
                            <button className="action-btn">📝</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button className="add-claim-btn">
                      ➕ Tambah Klaim
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="investigation-sidebar">
            <div className="damage-overview">
              <h4>⚠️ Jenis Kerusakan</h4>
              <div className="damage-types">
                {damageTypes.map((damage, index) => (
                  <div key={index} className={`damage-item ${damage.severity}`}>
                    <div className="damage-icon">{damage.icon}</div>
                    <div className="damage-info">
                      <span className="damage-type">{damage.type}</span>
                      <span className="damage-count">{damage.count} kasus</span>
                    </div>
                    <div className="damage-trend">
                      {damage.severity === 'high' ? '📈' : damage.severity === 'medium' ? '➡️' : '📉'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="field-officers">
              <h4>👷 Petugas Lapangan</h4>
              <div className="officers-list">
                {fieldOfficers.map((officer, index) => (
                  <div key={index} className="officer-card">
                    <div className="officer-avatar">👷</div>
                    <div className="officer-info">
                      <h5>{officer.name}</h5>
                      <p>📍 {officer.area}</p>
                      <div className="officer-stats">
                        <span>🔍 {officer.activeClaims} aktif</span>
                        <span>⭐ {officer.rating}</span>
                      </div>
                    </div>
                    <button className="assign-btn">Assign</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'assessment' && (
        <div className="assessment-view">
          <div className="assessment-tools">
            <div className="damage-calculator">
              <h3>📊 Kalkulator Penilaian Kerusakan</h3>
              <div className="calculator-form">
                <div className="form-section">
                  <h4>🌾 Data Lahan</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Luas Total (Ha)</label>
                      <input type="number" placeholder="2.0" />
                    </div>
                    <div className="form-group">
                      <label>Luas Rusak (Ha)</label>
                      <input type="number" placeholder="1.5" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Jenis Komoditas</label>
                      <select>
                        <option>Padi</option>
                        <option>Jagung</option>
                        <option>Kedelai</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Fase Pertumbuhan</label>
                      <select>
                        <option>Vegetatif</option>
                        <option>Generatif</option>
                        <option>Pematangan</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>⚠️ Tingkat Kerusakan</h4>
                  <div className="damage-levels">
                    <label className="damage-option">
                      <input type="radio" name="damage" value="75-85" />
                      <div className="option-content">
                        <span className="percentage">75-85%</span>
                        <span className="description">Kerusakan Berat</span>
                      </div>
                    </label>
                    <label className="damage-option">
                      <input type="radio" name="damage" value="85-95" />
                      <div className="option-content">
                        <span className="percentage">85-95%</span>
                        <span className="description">Kerusakan Parah</span>
                      </div>
                    </label>
                    <label className="damage-option">
                      <input type="radio" name="damage" value="95-100" />
                      <div className="option-content">
                        <span className="percentage">95-100%</span>
                        <span className="description">Puso Total</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="assessment-result">
                  <h4>💰 Perhitungan Kompensasi</h4>
                  <div className="calculation-breakdown">
                    <div className="calc-item">
                      <span>Luas Rusak Memenuhi Syarat:</span>
                      <span>1.5 Ha</span>
                    </div>
                    <div className="calc-item">
                      <span>Tarif Kompensasi:</span>
                      <span>Rp 6,000,000/Ha</span>
                    </div>
                    <div className="calc-item">
                      <span>Persentase Kerusakan:</span>
                      <span>85%</span>
                    </div>
                    <div className="calc-total">
                      <span>Total Kompensasi:</span>
                      <span>Rp 9,000,000</span>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn-save-assessment">💾 Simpan Penilaian</button>
                  <button className="btn-generate-report">📄 Generate Laporan</button>
                </div>
              </div>
            </div>

            <div className="photo-evidence">
              <h4>📸 Dokumentasi Lapangan</h4>
              <div className="photo-uploader">
                <div className="upload-area">
                  <div className="upload-icon">📸</div>
                  <p>Upload foto kerusakan</p>
                  <button className="btn-upload">Pilih File</button>
                </div>
              </div>
              <div className="photo-gallery">
                <div className="photo-item">
                  <div className="photo-placeholder">🖼️</div>
                  <p>Foto Before</p>
                </div>
                <div className="photo-item">
                  <div className="photo-placeholder">🖼️</div>
                  <p>Foto After</p>
                </div>
                <div className="photo-item">
                  <div className="photo-placeholder">🖼️</div>
                  <p>Foto Detail</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'payment' && (
        <div className="payment-view">
          <div className="payment-dashboard">
            <div className="payment-stats">
              <div className="stat-card">
                <h4>💰 Total Kompensasi Bulan Ini</h4>
                <div className="stat-amount">Rp 21,400,000</div>
                <div className="stat-detail">89 pembayaran selesai</div>
              </div>
              <div className="stat-card">
                <h4>⏳ Menunggu Pembayaran</h4>
                <div className="stat-amount">Rp 15,200,000</div>
                <div className="stat-detail">23 klaim disetujui</div>
              </div>
              <div className="stat-card">
                <h4>⏱️ Rata-rata Waktu Proses</h4>
                <div className="stat-amount">4.2 hari</div>
                <div className="stat-detail">Target: ≤ 7 hari</div>
              </div>
            </div>

            <div className="payment-queue">
              <h3>💸 Antrian Pembayaran</h3>
              <div className="queue-filters">
                <button className="filter-btn active">Semua</button>
                <button className="filter-btn">Siap Bayar</button>
                <button className="filter-btn">Dalam Proses</button>
                <button className="filter-btn">Selesai</button>
              </div>
              
              <div className="payment-list">
                {claims.filter(c => c.status === 'Disetujui').map(claim => (
                  <div key={claim.id} className="payment-item">
                    <div className="payment-info">
                      <div className="payment-header">
                        <span className="payment-id">{claim.id}</span>
                        <span className="payment-status approved">Disetujui</span>
                      </div>
                      <h4>{claim.petani}</h4>
                      <div className="payment-details">
                        <span>📄 Polis: {claim.polis}</span>
                        <span>🌾 {claim.luasRusak} Ha</span>
                        <span>📊 {claim.persentaseRusak}% rusak</span>
                      </div>
                    </div>
                    <div className="payment-amount">
                      <div className="amount">Rp {(claim.kompensasi / 1000000).toFixed(1)}M</div>
                      <div className="amount-detail">Kompensasi</div>
                    </div>
                    <div className="payment-actions">
                      <button className="btn-process-payment">💳 Proses Bayar</button>
                      <button className="btn-view-details">👁️ Detail</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="batch-actions">
                <button className="btn-batch-payment">💰 Batch Payment</button>
                <button className="btn-export-payment">📤 Export Data</button>
                <button className="btn-payment-report">📊 Laporan Pembayaran</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'analytics' && (
        <div className="analytics-view">
          <div className="analytics-dashboard">
            <div className="analytics-grid">
              <div className="chart-card">
                <h4>📈 Tren Klaim per Bulan</h4>
                <div className="chart-placeholder">
                  <div className="chart-bars">
                    {[65, 45, 78, 89, 67, 92].map((height, index) => (
                      <div 
                        key={index} 
                        className="chart-bar" 
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pattern-analysis">
                <h4>🔍 Analisis Pola Kerusakan</h4>
                <div className="pattern-list">
                  <div className="pattern-item">
                    <span className="pattern-icon">🌊</span>
                    <div className="pattern-info">
                      <span className="pattern-type">Banjir</span>
                      <span className="pattern-trend">↗️ +23% vs bulan lalu</span>
                    </div>
                  </div>
                  <div className="pattern-item">
                    <span className="pattern-icon">☀️</span>
                    <div className="pattern-info">
                      <span className="pattern-type">Kekeringan</span>
                      <span className="pattern-trend">↘️ -12% vs bulan lalu</span>
                    </div>
                  </div>
                  <div className="pattern-item">
                    <span className="pattern-icon">🐀</span>
                    <div className="pattern-info">
                      <span className="pattern-type">Hama Tikus</span>
                      <span className="pattern-trend">→ Stabil</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="regional-analysis">
                <h4>🗺️ Hotspot Regional</h4>
                <div className="hotspot-list">
                  <div className="hotspot-item high">
                    <span className="hotspot-indicator">🔴</span>
                    <div className="hotspot-info">
                      <span className="region-name">Karawang, Jawa Barat</span>
                      <span className="claim-count">45 klaim aktif</span>
                    </div>
                  </div>
                  <div className="hotspot-item medium">
                    <span className="hotspot-indicator">🟡</span>
                    <div className="hotspot-info">
                      <span className="region-name">Demak, Jawa Tengah</span>
                      <span className="claim-count">32 klaim aktif</span>
                    </div>
                  </div>
                  <div className="hotspot-item low">
                    <span className="hotspot-indicator">🟢</span>
                    <div className="hotspot-info">
                      <span className="region-name">Malang, Jawa Timur</span>
                      <span className="claim-count">18 klaim aktif</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="performance-metrics">
                <h4>⚡ Performa Tim</h4>
                <div className="performance-list">
                  <div className="performance-item">
                    <span className="metric-label">Avg. Investigation Time</span>
                    <div className="metric-value">
                      <span className="value">2.8 hari</span>
                      <span className="target">Target: ≤ 3 hari</span>
                    </div>
                  </div>
                  <div className="performance-item">
                    <span className="metric-label">Verification Accuracy</span>
                    <div className="metric-value">
                      <span className="value">94.2%</span>
                      <span className="target">Target: ≥ 90%</span>
                    </div>
                  </div>
                  <div className="performance-item">
                    <span className="metric-label">Payment Processing</span>
                    <div className="metric-value">
                      <span className="value">4.2 hari</span>
                      <span className="target">Target: ≤ 7 hari</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedClaim && (
        <div className="claim-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Detail Klaim {selectedClaim.id}</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedClaim(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="claim-summary">
                <h4>{selectedClaim.petani}</h4>
                <p>Polis: {selectedClaim.polis}</p>
                <p>Penyebab: {selectedClaim.penyebab}</p>
                <p>Tanggal Klaim: {selectedClaim.tanggalKlaim}</p>
              </div>
              <div className="damage-info">
                <p>Luas Rusak: {selectedClaim.luasRusak} Ha ({selectedClaim.persentaseRusak}%)</p>
                <p>Kompensasi: Rp {selectedClaim.kompensasi.toLocaleString()}</p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-approve">✅ Setujui</button>
              <button className="btn-reject">❌ Tolak</button>
              <button className="btn-schedule">📅 Jadwalkan Survey</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClaimsModule
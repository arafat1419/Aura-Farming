import React, { useState } from 'react'
import { applications } from '../../data/mockData'
import './ApplicationsModule.css'

const ApplicationsModule = () => {
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [activeView, setActiveView] = useState('pipeline')
  const [premiumCalculator, setPremiumCalculator] = useState({
    luas: '',
    jenisKomoditas: 'padi',
    risikoTinggi: false
  })

  const processingStages = [
    { id: 'submitted', name: 'Diajukan', count: 45, color: '#3b82f6', icon: '📝' },
    { id: 'review', name: 'Review Dokumen', count: 23, color: '#f59e0b', icon: '🔍' },
    { id: 'assessment', name: 'Penilaian Risiko', count: 18, color: '#8b5cf6', icon: '⚖️' },
    { id: 'approval', name: 'Persetujuan', count: 12, color: '#06b6d4', icon: '✅' },
    { id: 'policy', name: 'Penerbitan Polis', count: 8, color: '#10b981', icon: '📄' }
  ]

  const calculatePremium = () => {
    const basePremium = 300000 // Rp 300,000 per hectare
    const luas = parseFloat(premiumCalculator.luas) || 0
    const multiplier = premiumCalculator.risikoTinggi ? 1.5 : 1
    const komoditasMultiplier = premiumCalculator.jenisKomoditas === 'jagung' ? 1.2 : 1
    
    return Math.round(basePremium * luas * multiplier * komoditasMultiplier)
  }

  const recentApplications = applications.slice(0, 6)

  return (
    <div className="applications-module">
      <div className="module-header">
        <h1>📋 Sistem Aplikasi Asuransi</h1>
        <p>Kelola proses aplikasi dan penerbitan polis asuransi pertanian</p>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">98,456</span>
            <span className="stat-label">Total Aplikasi</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">94.2%</span>
            <span className="stat-label">Tingkat Persetujuan</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">Rp 47.8M</span>
            <span className="stat-label">Premi Terkumpul</span>
          </div>
        </div>
      </div>

      <div className="application-tabs">
        <button 
          className={`tab ${activeView === 'pipeline' ? 'active' : ''}`}
          onClick={() => setActiveView('pipeline')}
        >
          🔄 Pipeline Proses
        </button>
        <button 
          className={`tab ${activeView === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveView('calculator')}
        >
          🧮 Kalkulator Premi
        </button>
        <button 
          className={`tab ${activeView === 'policies' ? 'active' : ''}`}
          onClick={() => setActiveView('policies')}
        >
          📄 Manajemen Polis
        </button>
        <button 
          className={`tab ${activeView === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveView('analytics')}
        >
          📊 Analisis Performa
        </button>
      </div>

      {activeView === 'pipeline' && (
        <div className="pipeline-view">
          <div className="processing-pipeline">
            <h3>Pipeline Pemrosesan Aplikasi</h3>
            <div className="pipeline-stages">
              {processingStages.map((stage, index) => (
                <div key={stage.id} className="process-stage">
                  <div className="stage-icon" style={{ background: stage.color }}>
                    {stage.icon}
                  </div>
                  <div className="stage-info">
                    <h4>{stage.name}</h4>
                    <span className="stage-count">{stage.count} aplikasi</span>
                  </div>
                  <div className="stage-progress">
                    <div className="progress-circle">
                      <div 
                        className="progress-ring" 
                        style={{ 
                          background: `conic-gradient(${stage.color} ${(stage.count / 50) * 360}deg, #e5e7eb 0deg)` 
                        }}
                      ></div>
                      <span className="progress-text">{Math.round((stage.count / 50) * 100)}%</span>
                    </div>
                  </div>
                  <div className="stage-actions">
                    <button className="action-btn">Proses Batch</button>
                    <button className="action-btn secondary">Lihat Detail</button>
                  </div>
                  {index < processingStages.length - 1 && (
                    <div className="stage-connector"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="recent-applications">
            <div className="section-header">
              <h3>Aplikasi Terbaru</h3>
              <button className="btn-view-all">Lihat Semua →</button>
            </div>
            <div className="applications-list">
              {recentApplications.map(app => (
                <div key={app.id} className="application-card">
                  <div className="app-header">
                    <span className="app-id">{app.id}</span>
                    <span className={`app-status ${app.status.toLowerCase().replace(' ', '-')}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="app-content">
                    <h4>{app.petani}</h4>
                    <div className="app-details">
                      <span>🌾 {app.luas} Ha</span>
                      <span>💰 Rp {app.premi.toLocaleString()}</span>
                      <span>📅 {app.tanggalPengajuan}</span>
                    </div>
                    {app.polis !== '-' && (
                      <div className="policy-number">
                        📄 Polis: {app.polis}
                      </div>
                    )}
                  </div>
                  <div className="app-actions">
                    <button className="btn-process">⚡ Proses</button>
                    <button className="btn-view">👁️ Lihat</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === 'calculator' && (
        <div className="calculator-view">
          <div className="calculator-container">
            <div className="calculator-form">
              <h3>🧮 Kalkulator Premi Asuransi</h3>
              <p>Hitung estimasi premi berdasarkan luas lahan dan jenis komoditas</p>
              
              <div className="form-group">
                <label>Luas Lahan (Hektar)</label>
                <input
                  type="number"
                  value={premiumCalculator.luas}
                  onChange={(e) => setPremiumCalculator(prev => ({ ...prev, luas: e.target.value }))}
                  placeholder="Masukkan luas lahan..."
                  min="0"
                  max="2"
                  step="0.1"
                />
                <small>Maksimal 2 hektar per petani</small>
              </div>

              <div className="form-group">
                <label>Jenis Komoditas</label>
                <select
                  value={premiumCalculator.jenisKomoditas}
                  onChange={(e) => setPremiumCalculator(prev => ({ ...prev, jenisKomoditas: e.target.value }))}
                >
                  <option value="padi">Padi</option>
                  <option value="jagung">Jagung</option>
                  <option value="kedelai">Kedelai</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={premiumCalculator.risikoTinggi}
                    onChange={(e) => setPremiumCalculator(prev => ({ ...prev, risikoTinggi: e.target.checked }))}
                  />
                  Daerah Risiko Tinggi (banjir/kekeringan)
                </label>
              </div>

              <div className="premium-result">
                <h4>Estimasi Premi:</h4>
                <div className="premium-amount">
                  Rp {calculatePremium().toLocaleString()}
                </div>
                <div className="premium-breakdown">
                  <div className="breakdown-item">
                    <span>Premi Dasar:</span>
                    <span>Rp 300,000/Ha</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Luas Lahan:</span>
                    <span>{premiumCalculator.luas || 0} Ha</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Komoditas:</span>
                    <span>{premiumCalculator.jenisKomoditas}</span>
                  </div>
                  {premiumCalculator.risikoTinggi && (
                    <div className="breakdown-item risk">
                      <span>Faktor Risiko:</span>
                      <span>+50%</span>
                    </div>
                  )}
                </div>
              </div>

              <button className="btn-create-application">
                📝 Buat Aplikasi Baru
              </button>
            </div>

            <div className="premium-info">
              <h4>📋 Informasi Asuransi</h4>
              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">🛡️</div>
                  <div className="info-content">
                    <h5>Coverage</h5>
                    <p>Perlindungan hingga 75% kerusakan tanaman</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon">💰</div>
                  <div className="info-content">
                    <h5>Kompensasi</h5>
                    <p>Rp 6 juta per hektar untuk kerusakan >75%</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon">📅</div>
                  <div className="info-content">
                    <h5>Periode</h5>
                    <p>Satu musim tanam (4-6 bulan)</p>
                  </div>
                </div>
                <div className="info-card">
                  <div className="info-icon">🌾</div>
                  <div className="info-content">
                    <h5>Syarat</h5>
                    <p>Maksimal 2 hektar per petani</p>
                  </div>
                </div>
              </div>

              <div className="risk-factors">
                <h5>⚠️ Faktor Risiko yang Ditanggung:</h5>
                <ul>
                  <li>🌊 Banjir dan genangan</li>
                  <li>☀️ Kekeringan panjang</li>
                  <li>🐀 Serangan hama tikus</li>
                  <li>🦗 Serangan hama wereng</li>
                  <li>🌪️ Angin kencang/puting beliung</li>
                  <li>🦠 Penyakit tanaman</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'policies' && (
        <div className="policies-view">
          <div className="policies-header">
            <h3>📄 Manajemen Polis</h3>
            <div className="policy-actions">
              <button className="btn-generate">📄 Generate Polis Batch</button>
              <button className="btn-template">📝 Template Polis</button>
              <button className="btn-archive">📁 Arsip Polis</button>
            </div>
          </div>

          <div className="policy-stats">
            <div className="policy-stat">
              <span className="stat-number">17,892</span>
              <span className="stat-label">Polis Aktif</span>
            </div>
            <div className="policy-stat">
              <span className="stat-number">892</span>
              <span className="stat-label">Menunggu Penerbitan</span>
            </div>
            <div className="policy-stat">
              <span className="stat-number">76,234</span>
              <span className="stat-label">Ha Tertanggung</span>
            </div>
          </div>

          <div className="policy-management">
            <div className="policy-generator">
              <h4>🔄 Generator Polis Otomatis</h4>
              <p>Sistem akan generate polis untuk aplikasi yang sudah disetujui</p>
              <div className="generator-status">
                <div className="status-item">
                  <span className="status-count">12</span>
                  <span className="status-label">Siap Generate</span>
                </div>
                <div className="status-item">
                  <span className="status-count">5</span>
                  <span className="status-label">Dalam Proses</span>
                </div>
              </div>
              <button className="btn-start-generation">▶️ Mulai Generate</button>
            </div>

            <div className="policy-templates">
              <h4>📝 Template Polis</h4>
              <div className="template-list">
                <div className="template-item">
                  <span className="template-name">📄 Template Padi Standar</span>
                  <button className="btn-edit">✏️ Edit</button>
                </div>
                <div className="template-item">
                  <span className="template-name">📄 Template Jagung</span>
                  <button className="btn-edit">✏️ Edit</button>
                </div>
                <div className="template-item">
                  <span className="template-name">📄 Template Risiko Tinggi</span>
                  <button className="btn-edit">✏️ Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'analytics' && (
        <div className="analytics-view">
          <div className="analytics-grid">
            <div className="metric-card">
              <h4>📈 Tren Aplikasi</h4>
              <div className="metric-chart">
                <div className="chart-placeholder">
                  Grafik tren aplikasi 6 bulan terakhir
                </div>
              </div>
            </div>
            <div className="metric-card">
              <h4>⚖️ Tingkat Persetujuan</h4>
              <div className="approval-rate">
                <div className="rate-circle">
                  <span className="rate-number">94.2%</span>
                </div>
                <div className="rate-breakdown">
                  <div className="rate-item approved">
                    <span>Disetujui: 17,892</span>
                  </div>
                  <div className="rate-item rejected">
                    <span>Ditolak: 161</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="metric-card">
              <h4>⏱️ Waktu Pemrosesan</h4>
              <div className="processing-time">
                <div className="time-stat">
                  <span className="time-number">3.2</span>
                  <span className="time-unit">hari rata-rata</span>
                </div>
                <div className="time-target">
                  Target: ≤ 5 hari
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplicationsModule
import React, { useState } from 'react'
import './SatelliteModule.css'

const SatelliteModule = () => {
  const [activeView, setActiveView] = useState('map')
  const [selectedRegion, setSelectedRegion] = useState(null)

  const regions = [
    { id: 1, name: 'Jawa Barat', lat: -6.9175, lng: 107.6191, farms: 25847, alerts: 3, coverage: 94.2 },
    { id: 2, name: 'Jawa Tengah', lat: -7.2575, lng: 110.1739, farms: 18934, alerts: 1, coverage: 89.1 },
    { id: 3, name: 'Jawa Timur', lat: -7.5360, lng: 112.2384, farms: 22156, alerts: 2, coverage: 92.5 },
    { id: 4, name: 'Sumatra Utara', lat: 3.5952, lng: 98.6722, farms: 12845, alerts: 0, coverage: 86.8 },
    { id: 5, name: 'Sumatra Selatan', lat: -3.3194, lng: 104.9147, farms: 9876, alerts: 1, coverage: 88.3 }
  ]

  const satelliteData = [
    { satellite: 'Landsat-8', status: 'Active', coverage: '98.5%', lastUpdate: '2 jam lalu' },
    { satellite: 'Sentinel-2', status: 'Active', coverage: '96.2%', lastUpdate: '1 jam lalu' },
    { satellite: 'MODIS Terra', status: 'Active', coverage: '94.8%', lastUpdate: '3 jam lalu' },
    { satellite: 'SPOT-7', status: 'Maintenance', coverage: '0%', lastUpdate: '12 jam lalu' }
  ]

  const weatherAlerts = [
    { region: 'Jawa Barat', type: 'Drought Risk', severity: 'Medium', area: '1,250 Ha' },
    { region: 'Jawa Timur', type: 'Flood Warning', severity: 'High', area: '890 Ha' },
    { region: 'Sumatra Selatan', type: 'Temperature Alert', severity: 'Low', area: '456 Ha' }
  ]

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return '#dc2626'
      case 'Medium': return '#f59e0b'
      case 'Low': return '#10b981'
      default: return '#6b7280'
    }
  }

  return (
    <div className="satellite-module">
      <div className="module-header">
        <h1>🛰️ Monitoring Satelit</h1>
        <p>Pemantauan real-time kondisi lahan pertanian menggunakan teknologi satelit dan AI</p>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">Satelit Aktif</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">96.4%</span>
            <span className="stat-label">Coverage Area</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">89,658</span>
            <span className="stat-label">Lahan Terpantau</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">6</span>
            <span className="stat-label">Alert Aktif</span>
          </div>
        </div>
      </div>

      <div className="satellite-tabs">
        <button 
          className={`tab ${activeView === 'map' ? 'active' : ''}`}
          onClick={() => setActiveView('map')}
        >
          🗺️ Peta Monitoring
        </button>
        <button 
          className={`tab ${activeView === 'satellites' ? 'active' : ''}`}
          onClick={() => setActiveView('satellites')}
        >
          🛰️ Status Satelit
        </button>
        <button 
          className={`tab ${activeView === 'weather' ? 'active' : ''}`}
          onClick={() => setActiveView('weather')}
        >
          🌤️ Alert Cuaca
        </button>
        <button 
          className={`tab ${activeView === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveView('analytics')}
        >
          📊 AI Analytics
        </button>
      </div>

      {activeView === 'map' && (
        <div className="map-view">
          <div className="map-container">
            <div className="map-header">
              <h3>🗺️ Peta Sebaran Lahan Pertanian</h3>
              <div className="map-controls">
                <select>
                  <option>Semua Provinsi</option>
                  <option>Jawa Barat</option>
                  <option>Jawa Tengah</option>
                  <option>Jawa Timur</option>
                </select>
                <select>
                  <option>Layer: Vegetation Index</option>
                  <option>Layer: Soil Moisture</option>
                  <option>Layer: Weather Data</option>
                  <option>Layer: Crop Health</option>
                </select>
              </div>
            </div>

            <div className="simple-map">
              <div className="map-grid">
                {regions.map(region => (
                  <div 
                    key={region.id} 
                    className={`region-marker ${selectedRegion?.id === region.id ? 'selected' : ''} ${region.alerts > 0 ? 'has-alert' : ''}`}
                    onClick={() => setSelectedRegion(region)}
                    style={{
                      left: `${(region.lng + 95) * 4}%`,
                      top: `${(region.lat + 11) * 8}%`
                    }}
                  >
                    <div className="marker-icon">📍</div>
                    <div className="marker-label">{region.name}</div>
                    {region.alerts > 0 && (
                      <div className="alert-badge">{region.alerts}</div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="map-legend">
                <h4>Legenda</h4>
                <div className="legend-items">
                  <div className="legend-item">
                    <span className="legend-color healthy"></span>
                    <span>Kondisi Baik</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color warning"></span>
                    <span>Perlu Perhatian</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color danger"></span>
                    <span>Alert Tinggi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="region-details">
            <h4>Detail Regional</h4>
            {selectedRegion ? (
              <div className="region-info">
                <div className="region-header">
                  <h5>📍 {selectedRegion.name}</h5>
                  <span className="coverage-badge">{selectedRegion.coverage}% Coverage</span>
                </div>
                
                <div className="region-stats">
                  <div className="stat-row">
                    <span className="stat-label">Jumlah Lahan:</span>
                    <span className="stat-value">{selectedRegion.farms.toLocaleString()}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Alert Aktif:</span>
                    <span className="stat-value alert-count">{selectedRegion.alerts}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Koordinat:</span>
                    <span className="stat-value">{selectedRegion.lat}, {selectedRegion.lng}</span>
                  </div>
                </div>

                <div className="satellite-layers">
                  <h6>🛰️ Data Satelit Tersedia</h6>
                  <div className="layer-list">
                    <div className="layer-item">
                      <span className="layer-icon">🌱</span>
                      <span>NDVI - Vegetation Index</span>
                      <span className="layer-status active">Aktif</span>
                    </div>
                    <div className="layer-item">
                      <span className="layer-icon">💧</span>
                      <span>Soil Moisture</span>
                      <span className="layer-status active">Aktif</span>
                    </div>
                    <div className="layer-item">
                      <span className="layer-icon">🌡️</span>
                      <span>Temperature</span>
                      <span className="layer-status active">Aktif</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <p>🎯 Pilih region di peta untuk melihat detail</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'satellites' && (
        <div className="satellites-view">
          <div className="satellites-header">
            <h3>🛰️ Status Satelit</h3>
            <div className="refresh-info">
              <span>🔄 Update terakhir: 2 menit lalu</span>
            </div>
          </div>

          <div className="satellites-grid">
            {satelliteData.map((satellite, index) => (
              <div key={index} className="satellite-card">
                <div className="satellite-header">
                  <div className="satellite-name">
                    <span className="satellite-icon">🛰️</span>
                    <h4>{satellite.satellite}</h4>
                  </div>
                  <div className={`status-indicator ${satellite.status.toLowerCase()}`}>
                    {satellite.status}
                  </div>
                </div>
                
                <div className="satellite-stats">
                  <div className="stat-item">
                    <span className="stat-label">Coverage:</span>
                    <span className="stat-value">{satellite.coverage}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Last Update:</span>
                    <span className="stat-value">{satellite.lastUpdate}</span>
                  </div>
                </div>

                <div className="satellite-actions">
                  <button className="btn-view-data">📊 Lihat Data</button>
                  <button className="btn-download">⬇️ Download</button>
                </div>
              </div>
            ))}
          </div>

          <div className="data-quality">
            <h4>📈 Kualitas Data Satelit</h4>
            <div className="quality-metrics">
              <div className="metric-item">
                <span className="metric-label">Resolusi Rata-rata:</span>
                <span className="metric-value">10m/pixel</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Update Frequency:</span>
                <span className="metric-value">2-3 hari</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Cloud Coverage:</span>
                <span className="metric-value">&lt; 15%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'weather' && (
        <div className="weather-view">
          <div className="weather-header">
            <h3>🌤️ Alert Cuaca & Iklim</h3>
            <div className="alert-summary">
              <span className="alert-count high">2 High</span>
              <span className="alert-count medium">1 Medium</span>
              <span className="alert-count low">3 Low</span>
            </div>
          </div>

          <div className="weather-alerts">
            {weatherAlerts.map((alert, index) => (
              <div key={index} className={`alert-card ${alert.severity.toLowerCase()}`}>
                <div className="alert-header">
                  <div className="alert-info">
                    <h4>{alert.type}</h4>
                    <p>📍 {alert.region}</p>
                  </div>
                  <div 
                    className="severity-badge"
                    style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  >
                    {alert.severity}
                  </div>
                </div>
                <div className="alert-details">
                  <span className="affected-area">📏 Area Terdampak: {alert.area}</span>
                </div>
                <div className="alert-actions">
                  <button className="btn-view-detail">👁️ Detail</button>
                  <button className="btn-notify">📢 Notify Farmers</button>
                </div>
              </div>
            ))}
          </div>

          <div className="weather-forecast">
            <h4>🌦️ Prediksi Cuaca 7 Hari</h4>
            <div className="forecast-grid">
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, index) => (
                <div key={index} className="forecast-day">
                  <span className="day-name">{day}</span>
                  <span className="weather-icon">
                    {index < 2 ? '☀️' : index < 4 ? '⛅' : '🌧️'}
                  </span>
                  <span className="temp-range">
                    {28 + Math.floor(Math.random() * 4)}°-{32 + Math.floor(Math.random() * 4)}°
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === 'analytics' && (
        <div className="analytics-view">
          <div className="ai-insights">
            <h4>🤖 AI Analysis</h4>
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">🌱</span>
                  <h5>Crop Health Analysis</h5>
                </div>
                <div className="insight-content">
                  <div className="insight-value">94.2%</div>
                  <div className="insight-description">
                    Kondisi tanaman optimal berdasarkan NDVI index
                  </div>
                </div>
              </div>

              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">💧</span>
                  <h5>Soil Moisture</h5>
                </div>
                <div className="insight-content">
                  <div className="insight-value">78%</div>
                  <div className="insight-description">
                    Kelembaban tanah dalam rentang optimal
                  </div>
                </div>
              </div>

              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">⚠️</span>
                  <h5>Risk Assessment</h5>
                </div>
                <div className="insight-content">
                  <div className="insight-value">Low</div>
                  <div className="insight-description">
                    Risiko kekeringan rendah untuk 2 minggu ke depan
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="trend-analysis">
            <h4>📈 Trend Analysis</h4>
            <div className="trend-charts">
              <div className="chart-container">
                <h5>NDVI Trend (6 Bulan)</h5>
                <div className="simple-chart">
                  <div className="chart-bars">
                    {[0.82, 0.85, 0.88, 0.91, 0.89, 0.94].map((value, index) => (
                      <div key={index} className="trend-bar">
                        <div 
                          className="bar-fill" 
                          style={{ height: `${value * 100}%` }}
                        ></div>
                        <span className="bar-label">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="chart-labels">
                    {['Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'].map(month => (
                      <span key={month} className="month-label">{month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ai-recommendations">
            <h4>💡 AI Recommendations</h4>
            <div className="recommendation-list">
              <div className="recommendation-item">
                <span className="rec-icon">🌱</span>
                <div className="rec-content">
                  <h5>Optimasi Irigasi</h5>
                  <p>Berdasarkan data kelembaban tanah, disarankan mengurangi irigasi 15% di area Jawa Barat</p>
                </div>
              </div>
              <div className="recommendation-item">
                <span className="rec-icon">⚠️</span>
                <div className="rec-content">
                  <h5>Early Warning</h5>
                  <p>Potensi stress kekeringan di 3 area, disarankan monitoring intensif</p>
                </div>
              </div>
              <div className="recommendation-item">
                <span className="rec-icon">📊</span>
                <div className="rec-content">
                  <h5>Data Collection</h5>
                  <p>Tingkatkan frekuensi pengambilan data di area dengan coverage &lt; 90%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SatelliteModule
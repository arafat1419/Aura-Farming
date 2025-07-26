import React, { useState } from 'react'
import './DiaryModule.css'

const DiaryModule = () => {
  const [activeView, setActiveView] = useState('calendar')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedFarmer, setSelectedFarmer] = useState(null)

  const currentMonth = selectedDate.getMonth()
  const currentYear = selectedDate.getFullYear()
  
  // Sample diary entries
  const diaryEntries = {
    '2025-07-15': {
      farmer: 'Budi Santoso',
      activities: ['Penyiangan gulma', 'Pemupukan NPK 50kg'],
      weather: 'Cerah, suhu 28°C',
      cropCondition: 'Baik - tinggi tanaman 45cm',
      notes: 'Tanaman tumbuh sehat, tidak ada hama terlihat',
      photos: 2
    },
    '2025-07-16': {
      farmer: 'Siti Nurhaliza',
      activities: ['Pengairan sawah', 'Pemantauan hama'],
      weather: 'Berawan, hujan ringan',
      cropCondition: 'Sangat baik - mulai berbunga',
      notes: 'Kondisi air cukup setelah hujan',
      photos: 3
    },
    '2025-07-18': {
      farmer: 'Ahmad Wijaya',
      activities: ['Penyemprotan pestisida', 'Pemeliharaan saluran air'],
      weather: 'Cerah, angin kencang',
      cropCondition: 'Baik - fase pengisian bulir',
      notes: 'Ditemukan sedikit wereng, sudah disemprot',
      photos: 1
    }
  }

  const farmers = [
    { id: 1, name: 'Budi Santoso', location: 'Bandung, Jawa Barat', lastEntry: '2025-07-15', compliance: 92 },
    { id: 2, name: 'Siti Nurhaliza', location: 'Solo, Jawa Tengah', lastEntry: '2025-07-16', compliance: 88 },
    { id: 3, name: 'Ahmad Wijaya', location: 'Malang, Jawa Timur', lastEntry: '2025-07-18', compliance: 95 },
    { id: 4, name: 'Dewi Lestari', location: 'Medan, Sumatra Utara', lastEntry: '2025-07-14', compliance: 78 },
    { id: 5, name: 'Rahman Hidayat', location: 'Bogor, Jawa Barat', lastEntry: '2025-07-17', compliance: 85 }
  ]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      days.push({ date: currentDate, isCurrentMonth: true })
    }
    
    // Next month's leading days
    const remainingDays = 42 - days.length // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({ date: nextDate, isCurrentMonth: false })
    }
    
    return days
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const hasEntry = (date) => {
    return diaryEntries[formatDate(date)]
  }

  const getComplianceColor = (compliance) => {
    if (compliance >= 90) return 'high'
    if (compliance >= 80) return 'medium'
    return 'low'
  }

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const dayNames = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

  return (
    <div className="diary-module">
      <div className="module-header">
        <h1>📖 Catatan Harian Petani</h1>
        <p>Pantau aktivitas dan kondisi tanaman petani secara real-time</p>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">67,234</span>
            <span className="stat-label">Petani Aktif</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">91.3%</span>
            <span className="stat-label">Tingkat Kepatuhan</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">18,567</span>
            <span className="stat-label">Catatan Hari Ini</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24.8</span>
            <span className="stat-label">Hari/Bulan Rata-rata</span>
          </div>
        </div>
      </div>

      <div className="diary-tabs">
        <button 
          className={`tab ${activeView === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveView('calendar')}
        >
          📅 Kalender Aktivitas
        </button>
        <button 
          className={`tab ${activeView === 'farmers' ? 'active' : ''}`}
          onClick={() => setActiveView('farmers')}
        >
          👨‍🌾 Daftar Petani
        </button>
        <button 
          className={`tab ${activeView === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveView('analytics')}
        >
          📊 Analisis Kepatuhan
        </button>
        <button 
          className={`tab ${activeView === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveView('insights')}
        >
          🔍 AI Insights
        </button>
      </div>

      {activeView === 'calendar' && (
        <div className="calendar-view">
          <div className="calendar-container">
            <div className="calendar-header">
              <button 
                className="nav-btn"
                onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, 1))}
              >
                ←
              </button>
              <h3>{monthNames[currentMonth]} {currentYear}</h3>
              <button 
                className="nav-btn"
                onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, 1))}
              >
                →
              </button>
            </div>

            <div className="calendar-grid">
              <div className="calendar-weekdays">
                {dayNames.map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>

              <div className="calendar-days">
                {getDaysInMonth(selectedDate).map((dayObj, index) => {
                  const entry = hasEntry(dayObj.date)
                  const isToday = formatDate(dayObj.date) === formatDate(new Date())
                  
                  return (
                    <div 
                      key={index} 
                      className={`calendar-day ${!dayObj.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${entry ? 'has-entry' : ''}`}
                      onClick={() => entry && setSelectedDate(dayObj.date)}
                    >
                      <span className="day-number">{dayObj.date.getDate()}</span>
                      {entry && (
                        <div className="entry-indicators">
                          <span className="entry-dot">•</span>
                          <span className="photo-count">{entry.photos}📸</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="entry-details">
            <h4>Detail Catatan</h4>
            {diaryEntries[formatDate(selectedDate)] ? (
              <div className="entry-content">
                <div className="entry-header">
                  <h5>{diaryEntries[formatDate(selectedDate)].farmer}</h5>
                  <span className="entry-date">{formatDate(selectedDate)}</span>
                </div>
                
                <div className="entry-section">
                  <h6>🌤️ Cuaca</h6>
                  <p>{diaryEntries[formatDate(selectedDate)].weather}</p>
                </div>

                <div className="entry-section">
                  <h6>🌾 Kondisi Tanaman</h6>
                  <p>{diaryEntries[formatDate(selectedDate)].cropCondition}</p>
                </div>

                <div className="entry-section">
                  <h6>🚜 Aktivitas</h6>
                  <ul>
                    {diaryEntries[formatDate(selectedDate)].activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>

                <div className="entry-section">
                  <h6>📝 Catatan</h6>
                  <p>{diaryEntries[formatDate(selectedDate)].notes}</p>
                </div>

                <div className="entry-photos">
                  <h6>📸 Foto ({diaryEntries[formatDate(selectedDate)].photos})</h6>
                  <div className="photo-grid">
                    {Array.from({ length: diaryEntries[formatDate(selectedDate)].photos }, (_, i) => (
                      <div key={i} className="photo-placeholder">
                        📷
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-entry">
                <p>📅 Tidak ada catatan untuk tanggal ini</p>
                <button className="btn-add-entry">➕ Tambah Catatan</button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'farmers' && (
        <div className="farmers-view">
          <div className="farmers-header">
            <h3>👨‍🌾 Daftar Petani & Kepatuhan</h3>
            <div className="farmers-filters">
              <select>
                <option>Semua Provinsi</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>Jawa Timur</option>
              </select>
              <select>
                <option>Semua Tingkat</option>
                <option>Kepatuhan Tinggi (&gt;90%)</option>
                <option>Kepatuhan Sedang (80-90%)</option>
                <option>Kepatuhan Rendah (&lt;80%)</option>
              </select>
            </div>
          </div>

          <div className="farmers-list">
            {farmers.map(farmer => (
              <div key={farmer.id} className="farmer-card">
                <div className="farmer-info">
                  <div className="farmer-avatar">👨‍🌾</div>
                  <div className="farmer-details">
                    <h4>{farmer.name}</h4>
                    <p>📍 {farmer.location}</p>
                    <p>📅 Entri terakhir: {farmer.lastEntry}</p>
                  </div>
                </div>
                
                <div className="compliance-info">
                  <div className={`compliance-score ${getComplianceColor(farmer.compliance)}`}>
                    {farmer.compliance}%
                  </div>
                  <div className="compliance-label">Kepatuhan</div>
                </div>

                <div className="farmer-actions">
                  <button className="btn-view-diary">📖 Lihat Catatan</button>
                  <button className="btn-send-reminder">🔔 Kirim Reminder</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'analytics' && (
        <div className="analytics-view">
          <div className="analytics-grid">
            <div className="chart-container">
              <h4>📈 Tren Kepatuhan Bulanan</h4>
              <div className="trend-chart">
                <div className="chart-bars">
                  {[85, 87, 89, 91, 88, 93].map((value, index) => (
                    <div key={index} className="trend-bar">
                      <div 
                        className="bar-fill" 
                        style={{ height: `${value}%` }}
                      ></div>
                      <span className="bar-label">{value}%</span>
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

            <div className="regional-compliance">
              <h4>🗺️ Kepatuhan Regional</h4>
              <div className="regional-list">
                {[
                  { region: 'Jawa Barat', compliance: 94, count: 25847 },
                  { region: 'Jawa Tengah', compliance: 89, count: 18934 },
                  { region: 'Jawa Timur', compliance: 92, count: 22156 },
                  { region: 'Sumatra Utara', compliance: 86, count: 12845 }
                ].map((data, index) => (
                  <div key={index} className="regional-item">
                    <div className="region-info">
                      <span className="region-name">{data.region}</span>
                      <span className="region-count">{data.count.toLocaleString()} petani</span>
                    </div>
                    <div className="region-compliance">
                      <div className="compliance-bar">
                        <div 
                          className="compliance-fill" 
                          style={{ width: `${data.compliance}%` }}
                        ></div>
                      </div>
                      <span className="compliance-value">{data.compliance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="activity-patterns">
              <h4>🕐 Pola Aktivitas Harian</h4>
              <div className="activity-timeline">
                {[
                  { time: '06:00', activity: 'Pemeriksaan Awal', count: 45 },
                  { time: '08:00', activity: 'Penyiangan', count: 78 },
                  { time: '10:00', activity: 'Pemupukan', count: 32 },
                  { time: '14:00', activity: 'Pengairan', count: 56 },
                  { time: '16:00', activity: 'Pemantauan Hama', count: 23 },
                  { time: '18:00', activity: 'Catatan Akhir', count: 89 }
                ].map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-time">{item.time}</div>
                    <div className="timeline-content">
                      <span className="activity-name">{item.activity}</span>
                      <span className="activity-count">{item.count} petani</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="compliance-alerts">
              <h4>⚠️ Alert Kepatuhan</h4>
              <div className="alert-list">
                <div className="alert-item warning">
                  <span className="alert-icon">⚠️</span>
                  <div className="alert-content">
                    <span className="alert-title">12 petani tidak input >3 hari</span>
                    <span className="alert-time">Jawa Barat region</span>
                  </div>
                </div>
                <div className="alert-item info">
                  <span className="alert-icon">ℹ️</span>
                  <div className="alert-content">
                    <span className="alert-title">Reminder otomatis terkirim</span>
                    <span className="alert-time">45 petani - 2 jam lalu</span>
                  </div>
                </div>
                <div className="alert-item success">
                  <span className="alert-icon">✅</span>
                  <div className="alert-content">
                    <span className="alert-title">Target kepatuhan tercapai</span>
                    <span className="alert-time">91.3% bulan ini</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'insights' && (
        <div className="insights-view">
          <div className="insights-grid">
            <div className="ai-summary">
              <h4>🤖 AI Summary</h4>
              <div className="summary-content">
                <div className="insight-item">
                  <span className="insight-icon">🌾</span>
                  <div className="insight-text">
                    <strong>Kondisi Tanaman:</strong> 94% petani melaporkan kondisi tanaman baik hingga sangat baik dalam 7 hari terakhir
                  </div>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">🌤️</span>
                  <div className="insight-text">
                    <strong>Cuaca:</strong> Pola cuaca normal dengan 3 hari hujan ringan, mendukung pertumbuhan optimal
                  </div>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">🐛</span>
                  <div className="insight-text">
                    <strong>Hama & Penyakit:</strong> Deteksi awal serangan wereng di 5 lokasi, tindakan preventif direkomendasikan
                  </div>
                </div>
              </div>
            </div>

            <div className="prediction-model">
              <h4>🔮 Prediksi AI</h4>
              <div className="prediction-cards">
                <div className="prediction-card">
                  <div className="prediction-header">
                    <span className="prediction-icon">📈</span>
                    <span className="prediction-title">Kepatuhan Bulan Depan</span>
                  </div>
                  <div className="prediction-value">93.2%</div>
                  <div className="prediction-confidence">Confidence: 87%</div>
                </div>
                <div className="prediction-card">
                  <div className="prediction-header">
                    <span className="prediction-icon">⚠️</span>
                    <span className="prediction-title">Risiko Hama</span>
                  </div>
                  <div className="prediction-value">Medium</div>
                  <div className="prediction-confidence">Probability: 65%</div>
                </div>
                <div className="prediction-card">
                  <div className="prediction-header">
                    <span className="prediction-icon">🌾</span>
                    <span className="prediction-title">Yield Prediction</span>
                  </div>
                  <div className="prediction-value">6.2 ton/Ha</div>
                  <div className="prediction-confidence">Accuracy: 92%</div>
                </div>
              </div>
            </div>

            <div className="recommendations">
              <h4>💡 Rekomendasi AI</h4>
              <div className="recommendation-list">
                <div className="recommendation-item high">
                  <div className="rec-priority">HIGH</div>
                  <div className="rec-content">
                    <h5>Tingkatkan Monitoring Hama</h5>
                    <p>Fokus pada 5 area dengan deteksi wereng untuk mencegah penyebaran</p>
                  </div>
                </div>
                <div className="recommendation-item medium">
                  <div className="rec-priority">MEDIUM</div>
                  <div className="rec-content">
                    <h5>Reminder System Optimization</h5>
                    <p>Sesuaikan waktu reminder berdasarkan pola aktivitas petani</p>
                  </div>
                </div>
                <div className="recommendation-item low">
                  <div className="rec-priority">LOW</div>
                  <div className="rec-content">
                    <h5>Training Program</h5>
                    <p>Program pelatihan untuk 12 petani dengan kepatuhan rendah</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiaryModule
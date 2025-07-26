import React from 'react'
import './QuickActions.css'

const QuickActions = ({ section }) => {
  const getActions = () => {
    switch (section) {
      case 'registration':
        return [
          { label: 'Tambah Petani Baru', icon: '➕', color: 'primary', action: () => alert('Formulir pendaftaran petani baru') },
          { label: 'Import Data Excel', icon: '📁', color: 'secondary', action: () => alert('Import data dari Excel') },
          { label: 'Verifikasi Batch', icon: '✅', color: 'success', action: () => alert('Verifikasi data secara batch') },
          { label: 'Cetak Laporan', icon: '🖨️', color: 'info', action: () => alert('Cetak laporan pendaftaran') }
        ]
      case 'applications':
        return [
          { label: 'Proses Aplikasi', icon: '⚡', color: 'primary', action: () => alert('Proses aplikasi asuransi') },
          { label: 'Generate Polis', icon: '📄', color: 'success', action: () => alert('Generate nomor polis') },
          { label: 'Kirim Notifikasi', icon: '📧', color: 'info', action: () => alert('Kirim notifikasi ke petani') },
          { label: 'Audit Trail', icon: '🔍', color: 'secondary', action: () => alert('Lihat audit trail') }
        ]
      case 'claims':
        return [
          { label: 'Proses Klaim', icon: '⚡', color: 'primary', action: () => alert('Proses klaim asuransi') },
          { label: 'Survey Lapangan', icon: '🌾', color: 'warning', action: () => alert('Jadwalkan survey lapangan') },
          { label: 'Approve Klaim', icon: '✅', color: 'success', action: () => alert('Approve klaim') },
          { label: 'Disbursement', icon: '💰', color: 'info', action: () => alert('Proses pembayaran') }
        ]
      case 'diary':
        return [
          { label: 'Reminder Petani', icon: '🔔', color: 'primary', action: () => alert('Kirim reminder input catatan') },
          { label: 'Analisis Pola', icon: '📊', color: 'info', action: () => alert('Analisis pola input') },
          { label: 'Export Data', icon: '📤', color: 'secondary', action: () => alert('Export data catatan') },
          { label: 'Set Target', icon: '🎯', color: 'warning', action: () => alert('Set target kepatuhan') }
        ]
      default:
        return [
          { label: 'Backup Data', icon: '💾', color: 'secondary', action: () => alert('Backup sistem data') },
          { label: 'Generate Report', icon: '📊', color: 'primary', action: () => alert('Generate laporan lengkap') },
          { label: 'System Settings', icon: '⚙️', color: 'info', action: () => alert('Pengaturan sistem') },
          { label: 'User Management', icon: '👥', color: 'warning', action: () => alert('Kelola pengguna') }
        ]
    }
  }

  return (
    <div className="quick-actions">
      <h3>Aksi Cepat</h3>
      <div className="actions-grid">
        {getActions().map((action, index) => (
          <button
            key={index}
            className={`action-btn ${action.color}`}
            onClick={action.action}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
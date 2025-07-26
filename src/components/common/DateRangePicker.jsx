import React, { useState } from 'react'
import './DateRangePicker.css'

const DateRangePicker = ({ onDateRangeChange, className = '' }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [preset, setPreset] = useState('')

  const presets = [
    { label: 'Hari Ini', value: 'today' },
    { label: '7 Hari Terakhir', value: '7days' },
    { label: '30 Hari Terakhir', value: '30days' },
    { label: 'Bulan Ini', value: 'thisMonth' },
    { label: 'Tahun Ini', value: 'thisYear' }
  ]

  const getPresetDates = (presetValue) => {
    const today = new Date()
    const start = new Date()
    
    switch (presetValue) {
      case 'today':
        return {
          start: today.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        }
      case '7days':
        start.setDate(today.getDate() - 7)
        return {
          start: start.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        }
      case '30days':
        start.setDate(today.getDate() - 30)
        return {
          start: start.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        }
      case 'thisMonth':
        start.setDate(1)
        return {
          start: start.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        }
      case 'thisYear':
        start.setMonth(0, 1)
        return {
          start: start.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        }
      default:
        return { start: '', end: '' }
    }
  }

  const handlePresetChange = (presetValue) => {
    setPreset(presetValue)
    const dates = getPresetDates(presetValue)
    setStartDate(dates.start)
    setEndDate(dates.end)
    onDateRangeChange(dates.start, dates.end)
  }

  const handleDateChange = () => {
    if (startDate && endDate) {
      setPreset('')
      onDateRangeChange(startDate, endDate)
    }
  }

  const clearDates = () => {
    setStartDate('')
    setEndDate('')
    setPreset('')
    onDateRangeChange('', '')
  }

  return (
    <div className={`date-range-picker ${className}`}>
      <div className="preset-buttons">
        {presets.map(p => (
          <button
            key={p.value}
            className={`preset-btn ${preset === p.value ? 'active' : ''}`}
            onClick={() => handlePresetChange(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
      
      <div className="custom-dates">
        <div className="date-inputs">
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value)
              handleDateChange()
            }}
            placeholder="Tanggal Mulai"
          />
          <span className="date-separator">sampai</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value)
              handleDateChange()
            }}
            placeholder="Tanggal Akhir"
          />
        </div>
        {(startDate || endDate) && (
          <button className="clear-btn" onClick={clearDates}>
            ✕ Hapus
          </button>
        )}
      </div>
    </div>
  )
}

export default DateRangePicker
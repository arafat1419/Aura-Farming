import React from 'react'
import { Line, Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import './ChartCard.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const ChartCard = ({ title, type, section }) => {
  const getChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
    
    switch (type) {
      case 'line':
        return {
          labels: months,
          datasets: [
            {
              label: 'Data Bulanan',
              data: [2100, 2800, 3200, 2900, 3800, 4200, 3900, 4500, 4100, 4800, 5200, 5800],
              borderColor: '#1a5e3a',
              backgroundColor: 'rgba(26, 94, 58, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4,
            },
          ],
        }
      
      case 'pie':
        return {
          labels: ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Sumatra Utara', 'Lainnya'],
          datasets: [
            {
              data: [35, 28, 22, 10, 5],
              backgroundColor: [
                '#1a5e3a',
                '#22d3ee',
                '#65a572',
                '#0891b2',
                '#0f766e',
              ],
              borderWidth: 2,
              borderColor: '#ffffff',
            },
          ],
        }
      
      case 'bar':
        return {
          labels: ['2021', '2022', '2023', '2024'],
          datasets: [
            {
              label: 'Tahun Sebelumnya',
              data: [15000, 18000, 22000, 25000],
              backgroundColor: '#e5e7eb',
              borderRadius: 4,
            },
            {
              label: 'Tahun Ini',
              data: [16500, 19800, 24200, 28500],
              backgroundColor: '#1a5e3a',
              borderRadius: 4,
            },
          ],
        }
      
      default:
        return {}
    }
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#1a5e3a',
        borderWidth: 1,
      },
    },
    scales: type !== 'pie' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    } : {},
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={getChartData()} options={chartOptions} />
      case 'pie':
        return <Pie data={getChartData()} options={chartOptions} />
      case 'bar':
        return <Bar data={getChartData()} options={chartOptions} />
      default:
        return <div>Chart type not supported</div>
    }
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>{title}</h3>
      </div>
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  )
}

export default ChartCard
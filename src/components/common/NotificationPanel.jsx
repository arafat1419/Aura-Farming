import React, { useState } from 'react'
import { notifications } from '../../data/mockData'
import './NotificationPanel.css'

const NotificationPanel = () => {
  const [notifs, setNotifs] = useState(notifications)
  const [showAll, setShowAll] = useState(false)

  const markAsRead = (id) => {
    setNotifs(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const unreadCount = notifs.filter(n => !n.read).length
  const displayedNotifs = showAll ? notifs : notifs.slice(0, 5)

  const getIcon = (type) => {
    switch (type) {
      case 'warning': return '⚠️'
      case 'error': return '❌'
      case 'success': return '✅'
      case 'info': return 'ℹ️'
      default: return '📢'
    }
  }

  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h3>
          Notifikasi 
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </h3>
        {unreadCount > 0 && (
          <button 
            className="mark-all-read"
            onClick={markAllAsRead}
          >
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      <div className="notification-list">
        {displayedNotifs.map(notification => (
          <div 
            key={notification.id}
            className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="notification-icon">
              {getIcon(notification.type)}
            </div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            {!notification.read && (
              <div className="unread-indicator"></div>
            )}
          </div>
        ))}
      </div>

      {notifs.length > 5 && (
        <button 
          className="show-more-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Tampilkan Lebih Sedikit' : `Tampilkan ${notifs.length - 5} Lainnya`}
        </button>
      )}
    </div>
  )
}

export default NotificationPanel
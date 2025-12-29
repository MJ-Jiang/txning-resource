import { Link } from 'react-router-dom'

export default function EventCard({ item }) {
  const href = `/detail/${item.category}/${item.id}`

  // eventDate: '2025-12-05'
  const date = item.eventDate ? new Date(item.eventDate) : null
  const day = date ? date.getDate() : ''
  const month = date ? date.toLocaleString('en-US', { month: 'short' }) : ''

  return (
    <Link to={href} className="card-link">
      <div className="event-card">
        <div className="event-date">
          {day}
          <span>{month}</span>
        </div>

        <div className="event-details">
          <h3 style={{ marginBottom: '5px' }}>{item.title}</h3>
          <p style={{ color: '#666' }}>
            <i className="fa-solid fa-location-dot"></i>{' '}
            {item.location ?? '地点暂无'}
            {' | '}
            {item.timeText ?? '时间暂无'}
          </p>
        </div>

        <span className="event-btn">INFO</span>
      </div>
    </Link>
  )
}

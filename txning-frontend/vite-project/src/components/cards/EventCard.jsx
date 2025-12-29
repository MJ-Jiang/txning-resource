import { Link } from 'react-router-dom'

export default function EventCard({ item }) {
  const href = `/detail/${item.category}/${item.id}`

  return (
    <Link to={href} className="card-link">
      <div className="event-card">
        <div className="event-date">
          {item.day}
          <span>{item.month}</span>
        </div>

        <div className="event-details">
          <h3 style={{ marginBottom: '5px' }}>{item.title}</h3>
          <p style={{ color: '#666' }}>
            <i className="fa-solid fa-location-dot"></i> {item.location} {'| '}
            {item.time}
          </p>
        </div>

        <span className="event-btn">INFO</span>
      </div>
    </Link>
  )
}

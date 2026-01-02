import { Link } from 'react-router-dom'
import { useDict } from '../../providers/useDict'

export default function EventCard({ item }) {
  const { categoryById } = useDict()

  const categoryCode = categoryById?.[item.category_id]?.code
  if (!categoryCode) {
    return null
  }

  const href = `/detail/${categoryCode}/${item.id}`

  // ✅ 后端字段：event_date: 'YYYY-MM-DD'
  const date = item.event_date ? new Date(item.event_date) : null
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
            {item.time_text ?? '时间暂无'}
          </p>
        </div>

        <span className="event-btn">INFO</span>
      </div>
    </Link>
  )
}

export default function EventCard({ item }) {
  return (
    <div className="event-card">
      <div className="event-date">
        {item.day}
        <span>{item.month}</span>
      </div>

      <div className="event-details">
        <h3 style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)', marginBottom: '5px' }}>
          {item.title}
        </h3>
        <p style={{ color: '#666' }}>
          <i className="fa-solid fa-location-dot"></i> {item.location}
        </p>
      </div>

      <a href={item.link ?? '#'} className="event-btn">
        INFO
      </a>
    </div>
  )
}

import EventCard from '../cards/EventCard'

export default function EventsTimeline({ items = [] }) {
  return (
    <div className="events-list">
      {items.map((item) => (
        <div key={item.id} className="event-item">
          <div className="event-marker"></div>
          <EventCard item={item} />
        </div>
      ))}
    </div>
  )
}

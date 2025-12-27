import EndorsementCard from '../cards/EndorsementCard'

export default function EndorsementGrid({ items = [] }) {
  return (
    <div className="mag-grid">
      {items.map((item) => (
        <EndorsementCard key={item.id} item={item} />
      ))}
    </div>
  )
}

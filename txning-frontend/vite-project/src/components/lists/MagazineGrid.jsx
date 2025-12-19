import MagazineCard from '../cards/MagazineCard'

export default function MagazineGrid({ items = [] }) {
  return (
    <div className="mag-grid">
      {items.map((item) => (
        <MagazineCard key={item.id} item={item} />
      ))}
    </div>
  )
}

import GalleryCard from '../cards/GalleryCard'

export default function GalleryGrid({ items = [] }) {
  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  )
}

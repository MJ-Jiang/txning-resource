import DramaCard from '../cards/DramaCard'

export default function DramaScroller({ items = [] }) {
  return (
    <div className="movie-scroller">
      {items.map((item) => (
        <DramaCard key={item.id} item={item} />
      ))}
    </div>
  )
}
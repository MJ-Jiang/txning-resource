import InterviewCard from '../cards/InterviewCard'

export default function InterviewGrid({ items = [] }) {
  return (
    <div className="interview-grid">
      {items.map((item) => (
        <InterviewCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default function InterviewCard({ item }) {
  return (
    <div className="interview-card">
      <i className="fa-solid fa-quote-left"></i>

      <img
        src={item.thumbUrl}
        className="inv-thumb"
        alt={item.alt ?? item.title}
      />

      <div className="inv-content">
        <h3>{item.title}</h3>
        <p className="inv-quote">{item.quote}</p>
      </div>
    </div>
  )
}

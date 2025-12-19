export default function DramaCard({ item }) {
  return (
    <div className="movie-item">
      {item.tagText ? (
        <div className="movie-tag" style={item.tagStyle}>
          {item.tagText}
        </div>
      ) : null}

      <img src={item.posterUrl} className="movie-poster" alt={item.alt ?? item.title} />

      <div className="movie-desc">
        <h4>{item.title}</h4>
        <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{item.meta}</p>
      </div>
    </div>
  )
}

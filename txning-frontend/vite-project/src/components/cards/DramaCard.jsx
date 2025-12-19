export default function DramaCard({ item }) {
    const meta = [
  item.year,
  item.genres?.join(' / ')
].filter(Boolean).join(' | ')
  return (
    <div className="movie-item">
      {item.status ? (
        <div className="movie-tag" style={item.tagStyle}>
          {item.status}
        </div>
      ) : null}

      <img src={item.posterUrl} className="movie-poster" alt={item.alt ?? item.title} />

      <div className="movie-desc">
        <h4>{item.title}</h4>
        <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{meta}</p>
      </div>
    </div>
  )
}

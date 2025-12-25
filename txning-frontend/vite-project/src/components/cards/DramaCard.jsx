import { Link } from 'react-router-dom'
const STATUS_STYLE = {
  待播: { background: '#888' },
  待播中: { background: '#888' },
  即将上线: { background: '#2F6BFF' },
  待映: { background: '#2F6BFF' },
  即将上映: { background: '#2F6BFF' },
  热播中: { background: '#E53935' },
  热映中: { background: '#E53935' },
  网络上线: { background: '#FFE46B' },
  已完结: { background: '#f3641b' },
}

export default function DramaCard({ item }) {
  const href = `/detail/${item.category}/${item.slug}`
  const meta = [item.year, item.genres?.join(' / ')].filter(Boolean).join(' | ')
  function StatusTag({ status }) {
    const style = STATUS_STYLE[status] ?? { background: '#888' }
    return (
      <span className="movie-tag" style={style}>
        {status}
      </span>
    )
  }
  return (
    <Link to={href} className="card-link">
      <div className="movie-item">
        {item.status ? <StatusTag status={item.status} /> : null}
        <img
          src={item.posterUrl}
          className="movie-poster"
          alt={item.alt ?? item.title}
        />

        <div className="movie-desc">
          <h4>{item.title}</h4>
          <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{meta}</p>
        </div>
      </div>
    </Link>
  )
}

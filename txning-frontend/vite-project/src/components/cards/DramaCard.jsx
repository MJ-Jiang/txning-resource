import { Link } from 'react-router-dom'

const STATUS_STYLE = {
  not_yet_released: { background: '#888' },
  upcoming: { background: '#2F6BFF' },
  now_showing: { background: '#E53935' },
  ended: { background: '#f3641b' },
}

function StatusTag({ status, label }) {
  const style = STATUS_STYLE[status] ?? { background: '#888' }

  return (
    <span className="movie-tag" style={style}>
      {label}
    </span>
  )
}

export default function DramaCard({ item }) {
  const href = `/detail/${item.category}/${item.id}`
  const meta = [item.year, item.genres?.join(' / ')].filter(Boolean).join(' | ')

  return (
    <Link to={href} className="card-link">
      <div className="movie-item">
        {item.statusLabel ? (
          <StatusTag status={item.status} label={item.statusLabel} />
        ) : null}

        <img
          src={item.posterUrl}
          className="movie-poster"
          alt={item.posterAlt ?? item.title}
        />

        <div className="movie-desc">
          <h4>{item.title}</h4>
          <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{meta}</p>
        </div>
      </div>
    </Link>
  )
}

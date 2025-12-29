import { Link } from 'react-router-dom'
import { STATUS_STYLE } from '../../dictionary/status'
import { GENRE_LABEL } from '../../dictionary/genre'

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
  const meta = [item.year, item.genreLabels?.join(' / ')]
    .filter(Boolean)
    .join(' | ')

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

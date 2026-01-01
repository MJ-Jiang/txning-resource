import { Link } from 'react-router-dom'
import { STATUS_STYLE, getStatusDisplayLabel } from '../../dictionary/status'
import { useDict } from '../../providers/useDict'

function StatusTag({ statusId, label }) {
  const style = STATUS_STYLE[statusId]
  return (
    <span className="movie-tag" style={style}>
      {label}
    </span>
  )
}

export default function DramaCard({ item, categoryCode }) {
  const { typeCodeById, typeNameById, genreNameById } = useDict()

  const typeCode = typeCodeById[item.type_id]
  const statusLabel = getStatusDisplayLabel(item.status_id, typeCode)

  const href = `/detail/${categoryCode}/${item.id}`

  const genreText = item.genre_ids
    .map((gid) => genreNameById[gid])
    .filter((v) => v)
    .join(' / ')

  const metaParts = []
  if (item.release_year !== null && item.release_year !== undefined) {
    metaParts.push(String(item.release_year))
  }
  if (genreText) metaParts.push(genreText)
  const meta = metaParts.join(' | ')

  const typeLabel = typeNameById[item.type_id]

  return (
    <Link to={href} className="card-link">
      <div className="movie-item">
        {statusLabel ? (
          <StatusTag statusId={item.status_id} label={statusLabel} />
        ) : null}

        <img src={item.cover_url} className="movie-poster" alt={item.title} />

        <div className="movie-desc">
          <h4>{item.title}</h4>

          {meta ? (
            <p style={{ color: '#aaa', fontSize: '0.8rem' }}>{meta}</p>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

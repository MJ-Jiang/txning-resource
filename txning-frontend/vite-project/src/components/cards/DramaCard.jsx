import { Link } from 'react-router-dom'
import { getStatusLabel, getStatusStyle } from '../../dictionary/status'
import { useDict } from '../../providers/useDict'

function StatusTag({ statusId, label }) {
  const style = getStatusStyle(statusId)
  return (
    <span className="movie-tag" style={style}>
      {label}
    </span>
  )
}

export default function DramaCard({ item }) {
  const { statusNameById, typeCodeById, genreNameById, categoryById } =
    useDict()

  const typeCode = typeCodeById?.[item.type_id] || ''
  const statusLabel = getStatusLabel(item.status_id, typeCode, statusNameById)
  const categoryCode = categoryById[item.category_id]?.code

  if (!categoryCode) {
    return null
  }
  const href = `/detail/${categoryCode}/${item.id}`

  const genreText = (item.genre_ids || [])
    .map((gid) => genreNameById?.[gid])
    .filter(Boolean)
    .join(' / ')

  const metaParts = []
  if (item.release_year !== null && item.release_year !== undefined) {
    metaParts.push(String(item.release_year))
  }
  if (genreText) metaParts.push(genreText)
  const meta = metaParts.join(' | ')

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

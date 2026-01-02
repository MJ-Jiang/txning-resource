// src/components/EventCard.jsx
import { Link } from 'react-router-dom'
import { STATUS_STYLE } from '../../dictionary/status'
import { useDict } from '../../providers/useDict'

function StatusTag({ statusId, label }) {
  const style = STATUS_STYLE?.[statusId] ?? { background: '#888' }
  if (!label) return null

  return (
    <span className="evt-page-status" style={style}>
      {label}
    </span>
  )
}

export default function EventpageCard({ item }) {
  const { statusNameById, cityNameById, categoryById } = useDict()

  // ✅ category：后端 category_id → dict → code
  const categoryCode = categoryById?.[item.category_id]?.code
  if (!categoryCode) {
    return null
  }

  const href = `/detail/${categoryCode}/${item.id}`

  // ✅ 后端字段：event_date
  const date = item.event_date ? new Date(item.event_date) : null
  const day = date ? String(date.getDate()) : ''
  const month = date ? date.toLocaleString('en-US', { month: 'short' }) : ''

  // ✅ 状态：status_id → dict name_zh
  const statusId = item.status_id
  const statusLabel = statusNameById?.[statusId] || ''

  // ✅ 城市：city_ids → dict name_zh
  const cityText = Array.isArray(item.city_ids)
    ? item.city_ids
        .map((id) => cityNameById?.[id])
        .filter(Boolean)
        .join(' / ')
    : ''

  const altText = item.title
  const posterUrl = item.cover_url

  return (
    <Link to={href} className="card-link">
      <div className="evt-page-card">
        {/* 图片区 */}
        <div className="evt-page-media">
          {/* 时间主视觉 */}
          <div className="evt-page-date">
            <div className="evt-page-month">{month}</div>
            <div className="evt-page-day">{day}</div>
          </div>

          {/* 状态 */}
          {statusId ? (
            <StatusTag statusId={statusId} label={statusLabel} />
          ) : null}

          <img src={posterUrl} className="evt-page-img" alt={altText} />
        </div>

        {/* 信息区 */}
        <div className="evt-page-info">
          <h3 className="evt-page-title">{item.title}</h3>

          <p className="evt-page-location">
            {cityText}
            {item.location && (
              <>
                <span> · </span>
                <span>{item.location || '暂无时间'}</span>
              </>
            )}
            {(item.time_text || item.event_date) && (
              <>
                <span> | </span>
                <span>{item.time_text ?? '暂无时间'}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </Link>
  )
}

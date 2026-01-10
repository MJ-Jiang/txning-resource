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
  const { statusNameById, categoryById } = useDict()

  // ✅ category：后端 category_id → dict → code
  const categoryCode = categoryById?.[item.category_id]?.code
  if (!categoryCode) return null

  const href = `/detail/${categoryCode}/${item.id}`

  // ✅ 后端字段：event_date
  const date = item.event_date ? new Date(item.event_date) : null
  const day = date ? String(date.getDate()) : ''
  const month = date ? date.toLocaleString('en-US', { month: 'short' }) : ''

  // ✅ 状态：status_id → dict name_zh
  const statusId = item.status_id
  const statusLabel = statusNameById?.[statusId] || ''

  const altText = item.title
  const posterUrl = item.cover_url

  // ✅ 只显示：地点 & 时间
  const locationText = item.location ? item.location : '暂无地点'
  const timeText = item.time_text ? item.time_text : '暂无时间'

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

          {/* ✅ 底部仅地点 + 时间，缺省显示“暂无地点 / 暂无时间” */}
          <p className="evt-page-location">
            <span>{locationText}</span>
            <span> | </span>
            <span>{timeText}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

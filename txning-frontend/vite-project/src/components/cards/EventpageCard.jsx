// src/components/EventCard.jsx
import { Link } from 'react-router-dom'
import { STATUS_STYLE, STATUS_FILTER_LABEL } from '../../dictionary/status'

function StatusTag({ status, label }) {
  const style = STATUS_STYLE?.[status] ?? { background: '#888' }
  const text = label ?? STATUS_FILTER_LABEL?.[status] ?? status

  if (!text) return null

  return (
    <span className="evt-page-status" style={style}>
      {text}
    </span>
  )
}

export default function EventCard({ item }) {
  const href = `/detail/${item.category}/${item.id}`

  // item.eventDate: 'YYYY-MM-DD'（可能为 null）
  const date = item.eventDate ? new Date(item.eventDate) : null
  const day = date ? String(date.getDate()) : ''
  const month = date ? date.toLocaleString('en-US', { month: 'short' }) : ''

  // ✅ 城市（mapper 输出：cityCodes/cityLabels，且可能为空）
  const cityText =
    (Array.isArray(item.cityLabels) &&
      item.cityLabels.filter(Boolean).join(' / ')) ||
    (Array.isArray(item.cityCodes) &&
      item.cityCodes.filter(Boolean).join(' / ')) ||
    item.cityLabel ||
    item.cityCode ||
    ''

  const altText = item.posterAlt || item.title

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

          {/* 状态：用 domain/status.js 的 style + label（优先 mapper 的 statusLabel） */}
          {item.status && (
            <StatusTag
              status={item.status}
              label={item.statusLabel || STATUS_FILTER_LABEL?.[item.status]}
            />
          )}

          <img src={item.posterUrl} className="evt-page-img" alt={altText} />
        </div>

        {/* 信息区 */}
        <div className="evt-page-info">
          <h3 className="evt-page-title">{item.title}</h3>

          {/* 可选：显示活动类型（mapper 已经给了 typeLabel） */}
          {item.typeLabel && <p className="evt-page-type">{item.typeLabel}</p>}

          <p className="evt-page-location">
            {cityText}
            {item.location && (
              <>
                <span> · </span>
                <span>{item.location}</span>
              </>
            )}
            {(item.timeText || item.eventDate) && (
              <>
                <span> | </span>
                <span>{item.timeText ?? '暂无时间'}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </Link>
  )
}

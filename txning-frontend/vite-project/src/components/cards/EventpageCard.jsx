import { Link } from 'react-router-dom'

const EVENT_STATUS_LABEL = {
  upcoming: '即将进行',
  ongoing: '进行中',
  ended: '已结束',
  canceled: '已取消',
}
const STATUS_STYLE = {
  upcoming: { background: '#2F6BFF' },
  ongoing: { background: '#2F6BFF' },
  ended: { background: '#888' },
  canceled: { background: '#888' },
}

export default function EventpageCard({ item }) {
  const href = `/detail/${item.category}/${item.id}`

  const statusLabel = EVENT_STATUS_LABEL[item.status] ?? item.status
  function StatusTag({ status }) {
    const style = STATUS_STYLE[status] ?? { background: '#888' }
    const label = EVENT_STATUS_LABEL[status] ?? status

    return (
      <span className="evt-page-status" style={style}>
        {label}
      </span>
    )
  }

  return (
    <Link to={href} className="card-link">
      <div className="evt-page-card">
        {/* 图片区 */}
        <div className="evt-page-media">
          {/* 时间主视觉 */}
          <div className="evt-page-date">
            <div className="evt-page-month">{item.month}</div>
            <div className="evt-page-day">{item.day}</div>
          </div>

          {/* 状态 */}
          {item.status && <StatusTag status={item.status} />}

          <img
            src={item.posterUrl}
            className="evt-page-img"
            alt={item.alt || item.title}
          />
        </div>

        {/* 信息区 */}
        <div className="evt-page-info">
          <h3 className="evt-page-title">{item.title}</h3>

          <p className="evt-page-location">
            {item.city}
            {item.location && (
              <>
                <span> · </span>
                <span>{item.location}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </Link>
  )
}

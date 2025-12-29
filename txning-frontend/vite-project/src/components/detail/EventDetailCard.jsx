// EventDetailCard.jsx
import {
  BOOKING_PLATFORM_LABEL,
  BOOKING_PLATFORM_ICON,
} from '../../dictionary/bookingPlatform'
import { STATUS_FILTER_LABEL } from '../../dictionary/status'

function toArray(v) {
  if (v == null) return []
  return Array.isArray(v) ? v : [v]
}

function joinText(v, sep = ' / ') {
  return toArray(v).filter(Boolean).join(sep)
}

function getBookingLinks(d) {
  // ✅ 只认 bookingPlatform: [{ code, url }]
  if (!Array.isArray(d?.bookingPlatform)) return []
  return d.bookingPlatform
    .map((t) => ({
      code: t?.code ?? '',
      url: t?.url ?? null, // 保留 null
    }))
    .filter((t) => t.code) // ✅ 只要求 code，url 允许为空（用于展示“有平台但未放链接”）
}

function formatEventDateTime({ eventDate, timeText }) {
  const d = typeof eventDate === 'string' ? eventDate : ''
  const t = typeof timeText === 'string' ? timeText : ''
  return [d, t].filter(Boolean).join(' ')
}

export default function EventDetailCard({ event }) {
  if (!event) return null

  const {
    posterUrl,
    posterAlt,
    title,

    cityCodes,
    cityLabels,
    location,

    eventDate,
    timeText,

    type,
    typeLabel,

    status,
    statusLabel,

    description,
    stickerText,

    // ✅ 保留 bookingPlatform 字段
    bookingPlatform,
  } = event

  const bookingLinks = getBookingLinks({ bookingPlatform })
  const showTickets = bookingLinks.length > 0

  const cityText =
    (Array.isArray(cityLabels) && cityLabels.filter(Boolean).join(' / ')) ||
    (Array.isArray(cityCodes) && cityCodes.filter(Boolean).join(' / ')) ||
    ''

  const dateTimeText = formatEventDateTime({ eventDate, timeText })
  const altText = posterAlt || title

  // ✅ 状态：优先 mapper 的 statusLabel，其次 domain/status 的 filter label，再其次英文
  const finalStatusLabel =
    statusLabel ||
    STATUS_FILTER_LABEL?.[status] ||
    (status ? String(status) : '')

  return (
    <div className="detail-card">
      <div className="detail-grid">
        {/* 封面 */}
        <div className="detail-cover">
          {posterUrl ? (
            <img className="detail-cover-img" src={posterUrl} alt={altText} />
          ) : (
            <div className="detail-cover-placeholder" />
          )}

          {stickerText && <div className="detail-sticker">{stickerText}</div>}
        </div>

        {/* 信息区 */}
        <div className="detail-info">
          <h1 className="detail-title">{title}</h1>

          <div className="detail-kv">
            {cityText && (
              <div className="kv-row">
                <div className="kv-k">城市</div>
                <div className="kv-v">{cityText}</div>
              </div>
            )}

            {location && (
              <div className="kv-row">
                <div className="kv-k">地点</div>
                <div className="kv-v">{location}</div>
              </div>
            )}

            {dateTimeText && (
              <div className="kv-row">
                <div className="kv-k">时间</div>
                <div className="kv-v">{dateTimeText}</div>
              </div>
            )}

            {(typeLabel || type) && (
              <div className="kv-row">
                <div className="kv-k">类型</div>
                <div className="kv-v">{typeLabel || joinText(type)}</div>
              </div>
            )}

            {finalStatusLabel && (
              <div className="kv-row">
                <div className="kv-k">状态</div>
                <div className="kv-v">
                  <span className="status-badge">{finalStatusLabel}</span>
                </div>
              </div>
            )}

            {/* ✅ 购票：平台可显示，但 url 为空则不可点击且不冒泡 */}
            {showTickets && (
              <div className="kv-row">
                <div className="kv-k">购票</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {bookingLinks.map((t) => {
                      const icon =
                        BOOKING_PLATFORM_ICON?.[t.code] || '/icons/link.svg'
                      const label = BOOKING_PLATFORM_LABEL?.[t.code] || t.code

                      const isClickable = Boolean(t.url)

                      const content = (
                        <img
                          className="platform-logo"
                          src={icon}
                          alt={label}
                          onClick={(e) => {
                            // ✅ 防止父级 Link/卡片点击被触发
                            if (!isClickable) {
                              e.preventDefault()
                              e.stopPropagation()
                            }
                          }}
                        />
                      )

                      // 有 url：正常外链
                      if (isClickable) {
                        return (
                          <a
                            key={`${t.code}-${t.url}`}
                            className="platform-link"
                            href={t.url}
                            target="_blank"
                            rel="noreferrer"
                            title={label}
                            onClick={(e) => {
                              // ✅ 也建议阻止冒泡，避免父级 Link 抢点击
                              e.stopPropagation()
                            }}
                          >
                            {content}
                          </a>
                        )
                      }

                      // 无 url：只展示，不跳转
                      return (
                        <span
                          key={`${t.code}-no-url`}
                          className="platform-link is-disabled"
                          title={`${label}（暂无链接）`}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                          style={{ cursor: 'not-allowed', opacity: 0.6 }}
                        >
                          {content}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 简介 */}
      {description && (
        <div className="detail-desc">
          <div className="detail-desc-hd">简介</div>
          <p className="detail-desc-text">{description}</p>
        </div>
      )}
    </div>
  )
}

// EventDetailCard.jsx
import { useMemo } from 'react'
import { useDict } from '../../providers/useDict'

function toArray(v) {
  if (v == null) return []
  return Array.isArray(v) ? v : [v]
}

function formatEventDateTime({ eventDate, timeText }) {
  const d = eventDate ? String(eventDate) : ''
  const t = timeText ? String(timeText) : ''
  return [d, t].filter(Boolean).join(' ')
}

function normalizeUrl(url) {
  if (!url) return null
  const u = String(url).trim()
  if (u.startsWith('http://') || u.startsWith('https://')) return u
  return `https://${u}`
}

export default function EventDetailCard(props) {
  const detail = props?.event ?? props?.detail ?? props

  const {
    statusNameById,
    typeNameById,
    bookingPlatformNameById,
    bookingPlatformByCode,
  } = useDict()

  const content = detail?.content ?? detail
  const cities = detail?.cities ?? []
  const booking_platforms = detail?.booking_platforms ?? []

  const posterUrl = content?.cover_url ?? null
  const title = content?.title ?? ''
  const altText = title || 'poster'

  const location = content?.location ?? ''
  const eventDate = content?.event_date ?? ''
  const timeText = content?.time_text ?? ''
  const dateTimeText = formatEventDateTime({ eventDate, timeText })

  const typeId = content?.type_id ?? null
  const statusId = content?.status_id ?? null

  const typeLabel =
    typeId != null ? (typeNameById?.[typeId] ?? String(typeId)) : ''
  const statusLabel =
    statusId != null ? (statusNameById?.[statusId] ?? String(statusId)) : ''

  const description = content?.description ?? ''

  const cityText = useMemo(() => {
    if (!Array.isArray(cities)) return ''
    const labels = cities
      .map((c) => c?.name_zh ?? c?.code ?? c?.id)
      .filter(Boolean)
    return labels.join(' / ')
  }, [cities])

  const bookingLinks = useMemo(() => {
    if (!Array.isArray(booking_platforms)) return []
    return booking_platforms
      .map((t) => {
        const p = t?.platform ?? {}
        const code = p.code ?? ''
        const url = normalizeUrl(t?.url)
        return { code, url, platform: p }
      })
      .filter((x) => x.code)
  }, [booking_platforms])

  if (!detail) return null
  const showTickets = bookingLinks.length > 0

  return (
    <div className="detail-card">
      <div className="detail-grid">
        <div className="detail-cover">
          {posterUrl ? (
            <img className="detail-cover-img" src={posterUrl} alt={altText} />
          ) : (
            <div className="detail-cover-placeholder" />
          )}
        </div>

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

            {typeLabel && (
              <div className="kv-row">
                <div className="kv-k">类型</div>
                <div className="kv-v">{typeLabel}</div>
              </div>
            )}

            {statusLabel && (
              <div className="kv-row">
                <div className="kv-k">状态</div>
                <div className="kv-v">
                  <span className="status-badge">{statusLabel}</span>
                </div>
              </div>
            )}

            {showTickets && (
              <div className="kv-row">
                <div className="kv-k">购票</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {bookingLinks.map((t) => {
                      const p = t.platform ?? {}
                      const code = t.code
                      const url = t.url

                      const label =
                        bookingPlatformByCode?.[code]?.name_zh ??
                        bookingPlatformNameById?.[p.id] ??
                        p.name_zh ??
                        code

                      const icon = `/icons/${p.code}.svg`
                      const isClickable = Boolean(url)

                      const iconNode = (
                        <img className="platform-logo" src={icon} alt={label} />
                      )

                      if (isClickable) {
                        return (
                          <a
                            key={`${code}-${url}`}
                            className="platform-link"
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            title={label}
                          >
                            {iconNode}
                          </a>
                        )
                      }

                      return (
                        <span
                          key={`${code}-no-url`}
                          className="platform-link is-disabled"
                          title={`${label}（暂无链接）`}
                          style={{ cursor: 'not-allowed', opacity: 0.6 }}
                        >
                          {iconNode}
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

      {description && (
        <div className="detail-desc">
          <div className="detail-desc-hd">简介</div>
          <p className="detail-desc-text">{description}</p>
        </div>
      )}
    </div>
  )
}

function toArray(v) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

function joinText(v, sep = ' / ') {
  return toArray(v).filter(Boolean).join(sep)
}

function getTicketLinks(d) {
  if (!Array.isArray(d?.ticketLinks)) return []
  return d.ticketLinks
    .map((t) => ({ platform: t?.platform ?? '', url: t?.url ?? '' }))
    .filter((t) => t.platform && t.url)
}

// 你可以按实际平台继续补全
const TICKET_ICON_MAP = {
  大麦: '/icons/damai.svg',
  猫眼: '/icons/maoyan.svg',
  票星球: '/icons/piaoxingqiu.svg',
  纷玩岛: '/icons/fenwandao.svg',
  秀动: '/icons/xiudong.svg',
  抖音: '/icons/douyin.svg',
  小红书: '/icons/xhs.svg',
  官方: '/icons/link.svg',
}

function IconImg({ src, alt, className }) {
  if (!src) return null
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => {
        console.error('Icon load failed:', src)
      }}
    />
  )
}

/**
 * 推荐：数据里 status 用英文（upcoming/ongoing/ended/canceled/postponed）
 * 如果你现在还是中文 status，也能显示：下面做了兼容
 */
const EVENT_STATUS_META = {
  upcoming: { label: '即将进行' },
  ongoing: { label: '进行中' },
  ended: { label: '已结束' },
  canceled: { label: '已取消' },
  postponed: { label: '已延期' },
}

// 兼容中文直接传进来的情况（可删）
const EVENT_STATUS_ALIAS = {
  即将进行: 'upcoming',
  进行中: 'ongoing',
  已结束: 'ended',
  已取消: 'canceled',
  已延期: 'postponed',
}

function normalizeEventStatus(status) {
  if (!status) return ''
  return EVENT_STATUS_ALIAS[status] || status
}

function formatEventDateTime({ year, month, day, time }) {
  // 你现在 month 是 'NOV' 这种展示型，直接拼就好
  const y = year ? String(year) : ''
  const m = month ? String(month).toUpperCase() : ''
  const d = day ? String(day).padStart(2, '0') : ''
  const t = time ? String(time) : ''
  // 输出：2025 NOV 24 19:30
  return [y, m, d, t].filter(Boolean).join(' ')
}

export default function EventDetailCard({ event }) {
  if (!event) return null

  const {
    posterUrl,
    title,
    alt,
    city,
    location,
    year,
    month,
    day,
    time,
    type,
    status,
    stickerText,
    desc,
  } = event

  const ticketLinks = getTicketLinks(event)

  const normalizedStatus = normalizeEventStatus(status)
  const statusLabel =
    EVENT_STATUS_META[normalizedStatus]?.label ||
    (typeof status === 'string' ? status : '')

  const dateTimeText = formatEventDateTime({ year, month, day, time })

  // 购票：有就显示，没有就不显示（你要求的行为）
  const showTickets = ticketLinks.length > 0

  return (
    <div className="detail-card">
      <div className="detail-grid">
        {/* 封面 */}
        <div className="detail-cover">
          {posterUrl ? (
            <img
              className="detail-cover-img"
              src={posterUrl}
              alt={alt || title}
            />
          ) : (
            <div className="detail-cover-placeholder" />
          )}

          {/* 角标：你给的 stickerText 可直接显示（比如场馆名/活动亮点） */}
          {stickerText && <div className="detail-sticker">{stickerText}</div>}
        </div>

        {/* 信息区 */}
        <div className="detail-info">
          <h1 className="detail-title">{title}</h1>

          <div className="detail-kv">
            {city && (
              <div className="kv-row">
                <div className="kv-k">城市</div>
                <div className="kv-v">{city}</div>
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

            {type && (
              <div className="kv-row">
                <div className="kv-k">类型</div>
                <div className="kv-v">{joinText(type)}</div>
              </div>
            )}

            {statusLabel && (
              <div className="kv-row">
                <div className="kv-k">状态</div>
                <div className="kv-v">
                  {/* 如果你不做不同状态不同颜色，就保持一个 class */}
                  <span className="status-badge">{statusLabel}</span>
                </div>
              </div>
            )}

            {showTickets && (
              <div className="kv-row">
                <div className="kv-k">购票</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {ticketLinks.map((t) => {
                      const iconSrc = TICKET_ICON_MAP[t.platform]
                      const finalIcon = iconSrc || '/icons/link.svg'

                      return (
                        <a
                          key={`${t.platform}-${t.url}`}
                          className="platform-link"
                          href={t.url}
                          target="_blank"
                          rel="noreferrer"
                          title={t.platform}
                        >
                          <IconImg
                            className="platform-logo"
                            src={finalIcon}
                            alt={t.platform}
                          />
                        </a>
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
      {desc && (
        <div className="detail-desc">
          <div className="detail-desc-hd">简介</div>
          <p className="detail-desc-text">{desc}</p>
        </div>
      )}
    </div>
  )
}

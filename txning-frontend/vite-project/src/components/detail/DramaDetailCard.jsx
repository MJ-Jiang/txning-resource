import { PLATFORM_ICON, PLATFORM_LABEL } from '../../dictionary/platform'
import {
  BOOKING_PLATFORM_LABEL,
  BOOKING_PLATFORM_ICON,
} from '../../dictionary/bookingPlatform'

function toArray(v) {
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}

function joinText(v, sep = ' / ') {
  return toArray(v).filter(Boolean).join(sep)
}

function getPlatforms(d) {
  if (!Array.isArray(d?.platforms)) return []
  return d.platforms
    .map((p) => ({
      code: p?.code ?? '',
      url: p?.url ?? null,
    }))
    .filter((p) => p.code)
}

function getTicketLinks(d) {
  if (!Array.isArray(d?.bookingPlatform)) return []
  return d.bookingPlatform
    .map((t) => ({
      code: t?.code ?? '',
      url: t?.url ?? null,
    }))
    .filter((t) => t.code)
}

function IconImg({ src, alt, className }) {
  if (!src) return null
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => console.error('Icon load failed:', src)}
    />
  )
}

export default function DramaDetailCard({ drama }) {
  if (!drama) return null

  const {
    posterUrl,
    title,
    typeLabel,
    genreLabels,
    year,
    episodes,
    ratingValue,
    ratingUrl,
    description,
  } = drama

  const platforms = getPlatforms(drama)
  const bookingPlatform = getTicketLinks(drama)

  // ✅ 只有数据库里有 url 才显示对应区块
  const playablePlatforms = platforms.filter((p) => Boolean(p.url))
  const buyableTickets = bookingPlatform.filter((t) => Boolean(t.url))

  const showPlay = playablePlatforms.length > 0
  const showTickets = buyableTickets.length > 0

  return (
    <div className="detail-card">
      <div className="detail-grid">
        <div className="detail-cover">
          {posterUrl ? (
            <img className="detail-cover-img" src={posterUrl} alt={title} />
          ) : (
            <div className="detail-cover-placeholder" />
          )}
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{title}</h1>

          <div className="detail-kv">
            {typeLabel ? (
              <div className="kv-row">
                <div className="kv-k">分类</div>
                <div className="kv-v">{typeLabel}</div>
              </div>
            ) : null}

            {genreLabels?.length > 0 ? (
              <div className="kv-row">
                <div className="kv-k">类型</div>
                <div className="kv-v">{joinText(genreLabels)}</div>
              </div>
            ) : null}

            {year ? (
              <div className="kv-row">
                <div className="kv-k">年份</div>
                <div className="kv-v">{year}</div>
              </div>
            ) : null}

            {episodes ? (
              <div className="kv-row">
                <div className="kv-k">集数</div>
                <div className="kv-v">{episodes}</div>
              </div>
            ) : null}

            {ratingValue || ratingUrl ? (
              <div className="kv-row">
                <div className="kv-k kv-k--icon">
                  <a
                    className="kv-ico-link"
                    href={ratingUrl || '#'}
                    target={ratingUrl ? '_blank' : undefined}
                    rel={ratingUrl ? 'noreferrer' : undefined}
                    onClick={(e) => {
                      if (!ratingUrl) e.preventDefault()
                    }}
                    title="豆瓣"
                  >
                    <IconImg
                      className="kv-ico"
                      src="/icons/db.svg"
                      alt="豆瓣"
                    />
                  </a>
                </div>
                <div className="kv-v">{ratingValue}</div>
              </div>
            ) : null}

            {/* 播放：仅当有 url */}
            {showPlay ? (
              <div className="kv-row">
                <div className="kv-k">播放</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {playablePlatforms.map((p) => {
                      const label = PLATFORM_LABEL[p.code] ?? p.code
                      const iconSrc = PLATFORM_ICON[p.code] ?? '/icons/link.svg'
                      return (
                        <a
                          key={`${p.code}-${p.url}`}
                          className="platform-link"
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          title={label}
                        >
                          <IconImg
                            className="platform-logo"
                            src={iconSrc}
                            alt={label}
                          />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            {/* 购票：仅当有 url */}
            {showTickets ? (
              <div className="kv-row">
                <div className="kv-k">购票</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {buyableTickets.map((t) => {
                      const label = BOOKING_PLATFORM_LABEL[t.code] ?? t.code
                      const iconSrc =
                        BOOKING_PLATFORM_ICON[t.code] ?? '/icons/link.svg'
                      return (
                        <a
                          key={`${t.code}-${t.url}`}
                          className="platform-link"
                          href={t.url}
                          target="_blank"
                          rel="noreferrer"
                          title={label}
                        >
                          <IconImg
                            className="platform-logo"
                            src={iconSrc}
                            alt={label}
                          />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {description ? (
        <div className="detail-desc">
          <div className="detail-desc-hd">简介</div>
          <p className="detail-desc-text">{description}</p>
        </div>
      ) : null}
    </div>
  )
}

import { PLATFORM_ICON, PLATFORM_LABEL } from '../../dictionary/platform'
import {
  BOOKING_PLATFORM_LABEL,
  BOOKING_PLATFORM_ICON,
} from '../../dictionary/bookingPlatform'

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

export default function DramaDetailCard({ detail }) {
  if (!detail) return null

  const { content, rating, genres, platforms, booking_platforms } = detail

  const title = content.title
  const coverUrl = content.cover_url
  const year = content.release_year
  const episodes = content.episode_count
  const description = content.description

  const ratingValue = rating?.value
  const ratingUrl = rating?.url

  const genreText = Array.isArray(genres)
    ? genres
        .map((g) => g.name_zh)
        .filter(Boolean)
        .join(' / ')
    : ''

  // 后端返回 platforms: [{ platform: {id, code, name_zh}, url }]
  const playablePlatforms = Array.isArray(platforms)
    ? platforms.filter((p) => Boolean(p.url))
    : []

  // 后端返回 booking_platforms: [{ platform: {...}, url }]
  const buyableTickets = Array.isArray(booking_platforms)
    ? booking_platforms.filter((t) => Boolean(t.url))
    : []

  const showPlay = playablePlatforms.length > 0
  const showTickets = buyableTickets.length > 0

  return (
    <div className="detail-card">
      <div className="detail-grid">
        <div className="detail-cover">
          <img className="detail-cover-img" src={coverUrl} alt={title} />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{title}</h1>

          <div className="detail-kv">
            {genreText ? (
              <div className="kv-row">
                <div className="kv-k">类型</div>
                <div className="kv-v">{genreText}</div>
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
                    href={ratingUrl}
                    target="_blank"
                    rel="noreferrer"
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

            {showPlay ? (
              <div className="kv-row">
                <div className="kv-k">播放</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {playablePlatforms.map((p) => {
                      const platform = p.platform
                      const key = `${platform.id}-${p.url}`

                      // 如果你的 PLATFORM_LABEL/ICON 已改成 id key：用 platform.id
                      // 如果你仍是 code key：用 platform.code
                      const label =
                        PLATFORM_LABEL[platform.id] ?? platform.name_zh

                      const iconSrc =
                        PLATFORM_ICON[platform.id] ?? '/icons/link.svg'

                      return (
                        <a
                          key={key}
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

            {showTickets ? (
              <div className="kv-row">
                <div className="kv-k">购票</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {buyableTickets.map((t) => {
                      const platform = t.platform
                      const key = `${platform.id}-${t.url}`

                      const label =
                        BOOKING_PLATFORM_LABEL[platform.id] ??
                        BOOKING_PLATFORM_LABEL[platform.code] ??
                        platform.name_zh

                      const iconSrc =
                        BOOKING_PLATFORM_ICON[platform.id] ??
                        BOOKING_PLATFORM_ICON[platform.code] ??
                        '/icons/link.svg'

                      return (
                        <a
                          key={key}
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

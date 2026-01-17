import { useMemo } from 'react'
import { useDict } from '../../providers/useDict'

function normalizeUrl(url) {
  if (!url) return null
  const u = String(url).trim()
  if (u.startsWith('http://') || u.startsWith('https://')) return u
  return `https://${u}`
}

function IconImg({ src, alt, className }) {
  if (!src) return null
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )
}

export default function DramaDetailCard({ detail }) {
  const { genreNameById, platformNameById, bookingPlatformNameById } = useDict()

  const { content, rating, genres, platforms, booking_platforms } = detail

  const title = content?.title ?? ''
  const coverUrl = content?.cover_url ?? ''
  const year = content?.release_year
  const episodes = content?.episode_count
  const description = content?.description ?? ''
  const statusId = content?.status_id ?? null

  const ratingValue = rating?.value
  const ratingUrl = normalizeUrl(rating?.url)

  const genreText = useMemo(() => {
    const gs = Array.isArray(genres) ? genres : []
    return gs
      .map((g) => genreNameById?.[g?.id])
      .filter(Boolean)
      .join(' / ')
  }, [genres, genreNameById])

  const playPlatforms = useMemo(() => {
    const ps = Array.isArray(platforms) ? platforms : []
    return ps
      .map((p) => {
        const url = normalizeUrl(p?.url ?? p?.platform?.url)
        if (!url) return null

        return {
          id: p?.platform?.id ?? null,
          code: p?.platform?.code ?? null,
          name_zh: p?.platform?.name_zh ?? null,
          url,
        }
      })
      .filter(Boolean)
  }, [platforms])

  const buyPlatforms = useMemo(() => {
    const bs = Array.isArray(booking_platforms) ? booking_platforms : []
    return bs
      .map((t) => ({
        id: t?.platform?.id ?? null,
        code: t?.platform?.code ?? null,
        name_zh: t?.platform?.name_zh ?? null,
        url: normalizeUrl(t?.url),
      }))
      .filter((x) => x.id != null)
  }, [booking_platforms])

  const showPlay = playPlatforms.length > 0
  const showBuy = statusId !== 4 && buyPlatforms.length > 0
  if (!detail) return null
  return (
    <div className="detail-card">
      <div className="detail-grid">
        <div className="detail-cover">
          <img className="detail-cover-img" src={coverUrl} alt={title} />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{title}</h1>

          <div className="detail-kv">
            {genreText && (
              <div className="kv-row">
                <div className="kv-k">类型</div>
                <div className="kv-v">{genreText}</div>
              </div>
            )}

            {year && (
              <div className="kv-row">
                <div className="kv-k">年份</div>
                <div className="kv-v">{year}</div>
              </div>
            )}

            {episodes && (
              <div className="kv-row">
                <div className="kv-k">集数</div>
                <div className="kv-v">{episodes}</div>
              </div>
            )}

            {(ratingValue || ratingUrl) && (
              <div className="kv-row">
                <div className="kv-k kv-k--icon">
                  <a
                    className="kv-ico-link"
                    href={ratingUrl || undefined}
                    target="_blank"
                    rel="noreferrer"
                    title="豆瓣"
                    onClick={(e) => {
                      if (!ratingUrl) e.preventDefault()
                    }}
                  >
                    <IconImg
                      className="kv-ico"
                      src="/icons/douban.svg"
                      alt="豆瓣"
                    />
                  </a>
                </div>
                <div className="kv-v">{ratingValue}</div>
              </div>
            )}

            {/* ▶ 播放（只在存在 url 时显示整行） */}
            {showPlay && (
              <div className="kv-row">
                <div className="kv-k">播放</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {playPlatforms.map((p) => {
                      const label =
                        platformNameById?.[p.id] ??
                        p.name_zh ??
                        p.code ??
                        String(p.id)

                      return (
                        <a
                          key={`${p.id}-${p.url}`}
                          className="platform-link"
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          title={label}
                        >
                          <IconImg
                            className="platform-logo"
                            src={`/icons/${p.code}.svg`}
                            alt={label}
                          />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ▶ 购买 */}
            {showBuy && (
              <div className="kv-row">
                <div className="kv-k">购买</div>
                <div className="kv-v">
                  <div className="platform-row">
                    {buyPlatforms.map((b) => {
                      const label =
                        bookingPlatformNameById?.[b.id] ??
                        b.name_zh ??
                        b.code ??
                        String(b.id)

                      return (
                        <a
                          key={`${b.id}-${b.url}`}
                          className="platform-link"
                          href={b.url}
                          target="_blank"
                          rel="noreferrer"
                          title={label}
                        >
                          <IconImg
                            className="platform-logo"
                            src={`/icons/${b.code}.svg`}
                            alt={label}
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

      {description && (
        <div className="detail-desc">
          <div className="detail-desc-hd">简介</div>
          <p className="detail-desc-text">{description}</p>
        </div>
      )}
    </div>
  )
}
